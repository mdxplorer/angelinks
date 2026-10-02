"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import PdfImporter from "@/components/PdfImporter";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { useAuth } from "@/components/auth/AuthProvider";

interface StagedProduct {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const brands = [
  { name: "O Boticário", color: "bg-secondary-100 text-secondary-700" },
  { name: "Yanbal", color: "bg-purple-100 text-purple-700" },
  { name: "Natura", color: "bg-amber-100 text-amber-700" },
  { name: "Avon", color: "bg-pink-100 text-pink-700" },
  { name: "Esika", color: "bg-blue-100 text-blue-700" },
  { name: "Otra", color: "bg-warm-200 text-warm-700" },
];

const categoryOptions = [
  "General", "Perfumería", "Cuidado Corporal", "Maquillaje",
  "Cabello", "Skincare", "Kits",
];

export default function NewCatalogPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const [catalog, setCatalog] = useState({
    name: "",
    brand: "",
    customBrand: "",
    description: "",
  });

  const [importMethod, setImportMethod] = useState<"manual" | "pdf" | "url">("manual");
  const [products, setProducts] = useState<StagedProduct[]>([]);
  const [showImporter, setShowImporter] = useState(true);

  const [manualForm, setManualForm] = useState({
    name: "", price: "", category: "General", description: "", image: "",
  });

  const [urlInput, setUrlInput] = useState("");
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");

  const selectedBrand = catalog.brand === "Otra" ? catalog.customBrand : catalog.brand;
  const canProceedStep1 = catalog.name.trim() && selectedBrand;
  const canProceedStep2 = products.length > 0;

  const addManualProduct = () => {
    if (!manualForm.name.trim() || !manualForm.price) return;
    setProducts((prev) => [
      ...prev,
      {
        name: manualForm.name.trim(),
        price: parseFloat(manualForm.price),
        category: manualForm.category,
        description: manualForm.description || manualForm.name.trim(),
        image: manualForm.image || "",
      },
    ]);
    setManualForm({ name: "", price: "", category: "General", description: "", image: "" });
  };

  const handleUrlImport = async () => {
    if (!urlInput.trim()) return;
    setImporting(true);
    setImportError("");
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput }),
      });
      const data = await res.json();
      if (data.products?.length > 0) {
        const mapped: StagedProduct[] = data.products.map(
          (p: { name: string; price: number; category?: string; description?: string; image_url?: string }) => ({
            name: p.name,
            price: p.price,
            category: p.category || "General",
            description: p.description || p.name,
            image: p.image_url || "",
          })
        );
        setProducts((prev) => [...prev, ...mapped]);
        setShowImporter(false);
      } else {
        setImportError(
          data.message || "No se encontraron productos en esa URL. Prueba con otra o agrega manualmente."
        );
      }
    } catch {
      setImportError("Error al importar. Verifica la URL e intenta de nuevo.");
    }
    setImporting(false);
  };

  const handlePdfProducts = (
    pdfProducts: { name: string; price: number; category: string; description: string; imageDataUrl: string }[]
  ) => {
    const mapped: StagedProduct[] = pdfProducts.map((p) => ({
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description,
      image: p.imageDataUrl,
    }));
    setProducts((prev) => [...prev, ...mapped]);
    setShowImporter(false);
  };

  const removeProduct = (idx: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleCreate = async () => {
    if (!user) return;
    setCreating(true);
    setError("");

    try {
      const supabase = getSupabaseBrowser();
      const slug =
        catalog.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 50) +
        "-" +
        Date.now().toString(36);

      const { data: catalogData, error: catalogError } = await supabase
        .from("catalogs")
        .insert({
          seller_id: user.id,
          name: catalog.name,
          slug,
          brand: selectedBrand,
          description: catalog.description,
          cover_image: products[0]?.image || "",
          is_active: true,
        })
        .select()
        .single();

      if (catalogError) throw catalogError;

      const productRows = products.map((p, i) => ({
        catalog_id: catalogData.id,
        name: p.name,
        description: p.description,
        category: p.category,
        catalog_price: p.price,
        sale_price: p.price,
        image_url: p.image,
        is_available: true,
        sort_order: i,
      }));

      const { error: productsError } = await supabase
        .from("products")
        .insert(productRows);

      if (productsError) throw productsError;

      router.push("/dashboard");
    } catch (err) {
      console.error("Error creating catalog:", err);
      setError("Error al crear el catálogo. Verifica que hayas ejecutado la migración de base de datos.");
      setCreating(false);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-warm-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="w-10 h-10 rounded-xl bg-warm-100 hover:bg-warm-200 flex items-center justify-center transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="font-display font-bold text-lg text-warm-800">Nuevo catálogo</h1>
              <p className="text-xs text-warm-600">Paso {step} de 3</p>
            </div>
          </div>
          <Logo size="sm" variant="icon" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1">
              <div className={`h-1.5 rounded-full transition-colors ${s <= step ? "bg-accent-500" : "bg-warm-200"}`} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-warm-600">
          <span className={step === 1 ? "text-accent-600 font-medium" : ""}>Detalles</span>
          <span className={step === 2 ? "text-accent-600 font-medium" : ""}>Productos</span>
          <span className={step === 3 ? "text-accent-600 font-medium" : ""}>Revisar</span>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Step 1: Catalog Details */}
        {step === 1 && (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1.5">Nombre del catálogo *</label>
                <input
                  type="text"
                  value={catalog.name}
                  onChange={(e) => setCatalog((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Ej: O Boticário - Temporada 10"
                  className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">Marca *</label>
                <div className="grid grid-cols-3 gap-2">
                  {brands.map((b) => (
                    <button
                      key={b.name}
                      onClick={() => setCatalog((p) => ({ ...p, brand: b.name }))}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        catalog.brand === b.name
                          ? `${b.color} ring-2 ring-accent-400`
                          : "bg-warm-50 text-warm-600 hover:bg-warm-100"
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
                {catalog.brand === "Otra" && (
                  <input
                    type="text"
                    value={catalog.customBrand}
                    onChange={(e) => setCatalog((p) => ({ ...p, customBrand: e.target.value }))}
                    placeholder="Nombre de la marca"
                    className="w-full mt-2 px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1.5">
                  Descripción <span className="text-warm-500 font-normal">(opcional)</span>
                </label>
                <textarea
                  value={catalog.description}
                  onChange={(e) => setCatalog((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Describe brevemente tu catálogo para tus clientes..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm resize-none"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canProceedStep1}
              className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-warm-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors text-base"
            >
              Siguiente — Agregar productos
            </button>
          </>
        )}

        {/* Step 2: Import Products */}
        {step === 2 && (
          <>
            {showImporter && (
              <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6 space-y-5">
                <h2 className="font-display font-semibold text-warm-800">
                  ¿Cómo quieres agregar productos?
                </h2>

                <div className="space-y-2">
                  {([
                    { key: "manual" as const, label: "Agregar manualmente", desc: "Escribe nombre, precio y agrega foto de cada producto", icon: "M12 5v14M5 12h14" },
                    { key: "pdf" as const, label: "Importar desde PDF", desc: "Sube el catálogo en PDF y selecciona productos", icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6" },
                    { key: "url" as const, label: "Importar desde URL", desc: "Pega el link del catálogo web", icon: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" },
                  ]).map((m) => (
                    <button
                      key={m.key}
                      onClick={() => { setImportMethod(m.key); setImportError(""); }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                        importMethod === m.key
                          ? "bg-accent-50 border-2 border-accent-400"
                          : "bg-warm-50 border-2 border-transparent hover:border-warm-200"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        importMethod === m.key ? "bg-accent-100" : "bg-warm-200"
                      }`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={importMethod === m.key ? "#E86550" : "#6B655C"} strokeWidth="2">
                          <path d={m.icon} />
                        </svg>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${importMethod === m.key ? "text-accent-700" : "text-warm-800"}`}>{m.label}</p>
                        <p className="text-xs text-warm-600">{m.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Manual product form */}
                {importMethod === "manual" && (
                  <div className="space-y-3 border-t border-warm-100 pt-5">
                    <p className="text-sm font-medium text-warm-700">Datos del producto</p>
                    <input
                      type="text"
                      placeholder="Nombre del producto *"
                      value={manualForm.name}
                      onChange={(e) => setManualForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Precio *"
                        value={manualForm.price}
                        onChange={(e) => setManualForm((f) => ({ ...f, price: e.target.value }))}
                        className="flex-1 px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm"
                      />
                      <select
                        value={manualForm.category}
                        onChange={(e) => setManualForm((f) => ({ ...f, category: e.target.value }))}
                        className="flex-1 px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm bg-white"
                      >
                        {categoryOptions.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Descripción (opcional)"
                      value={manualForm.description}
                      onChange={(e) => setManualForm((f) => ({ ...f, description: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm"
                    />
                    <input
                      type="url"
                      placeholder="URL de imagen (opcional)"
                      value={manualForm.image}
                      onChange={(e) => setManualForm((f) => ({ ...f, image: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm"
                    />
                    <button
                      onClick={addManualProduct}
                      disabled={!manualForm.name.trim() || !manualForm.price}
                      className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-warm-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Agregar producto
                    </button>
                  </div>
                )}

                {/* PDF importer */}
                {importMethod === "pdf" && (
                  <div className="border-t border-warm-100 pt-5">
                    <PdfImporter onProductsReady={handlePdfProducts} />
                  </div>
                )}

                {/* URL importer */}
                {importMethod === "url" && (
                  <div className="space-y-3 border-t border-warm-100 pt-5">
                    <p className="text-sm font-medium text-warm-700">URL del catálogo web</p>
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/catalogo"
                      value={urlInput}
                      onChange={(e) => { setUrlInput(e.target.value); setImportError(""); }}
                      className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 text-sm"
                    />
                    {importError && (
                      <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{importError}</p>
                    )}
                    <button
                      onClick={handleUrlImport}
                      disabled={importing || !urlInput.trim()}
                      className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-warm-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      {importing ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Importando productos...
                        </>
                      ) : (
                        "Importar productos"
                      )}
                    </button>
                    <p className="text-xs text-warm-500 text-center">
                      Funciona mejor con sitios que muestran productos en HTML (no en iframes o JavaScript dinámico)
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Product list */}
            {products.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-semibold text-warm-800">
                    {products.length} producto{products.length !== 1 ? "s" : ""} agregado{products.length !== 1 ? "s" : ""}
                  </h2>
                  {!showImporter && (
                    <button
                      onClick={() => setShowImporter(true)}
                      className="text-sm text-accent-600 hover:text-accent-700 font-medium"
                    >
                      + Agregar más
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {products.map((p, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-warm-200 flex items-center gap-3">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-warm-200 flex items-center justify-center flex-shrink-0">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8D877E" strokeWidth="1.5">
                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-warm-800 truncate">{p.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm font-bold text-accent-600">
                            ${p.price.toLocaleString("es-CO")}
                          </span>
                          <span className="text-xs text-warm-500">{p.category}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeProduct(i)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-warm-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3.5 rounded-xl transition-colors text-base"
                >
                  Siguiente — Revisar catálogo
                </button>
              </div>
            )}

            <button
              onClick={() => setStep(1)}
              className="w-full text-sm text-warm-600 hover:text-warm-800 font-medium py-2 transition-colors"
            >
              ← Volver a detalles
            </button>
          </>
        )}

        {/* Step 3: Review & Publish */}
        {step === 3 && (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-warm-200 overflow-hidden">
              <div className="bg-gradient-to-br from-accent-300 to-accent-500 p-6 text-center">
                <Logo size="sm" variant="icon" className="mx-auto mb-3 [&_img]:brightness-0 [&_img]:invert" />
                <h2 className="font-display font-bold text-lg text-white">{catalog.name}</h2>
                <p className="text-sm text-white/80 mt-1">{selectedBrand}</p>
              </div>

              <div className="grid grid-cols-3 divide-x divide-warm-200 border-b border-warm-200">
                <div className="p-4 text-center">
                  <p className="text-2xl font-display font-bold text-warm-800">{products.length}</p>
                  <p className="text-xs text-warm-600">Productos</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-display font-bold text-warm-800">
                    {[...new Set(products.map((p) => p.category))].length}
                  </p>
                  <p className="text-xs text-warm-600">Categorías</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-display font-bold text-accent-600">
                    ${Math.min(...products.map((p) => p.price)).toLocaleString("es-CO")}
                  </p>
                  <p className="text-xs text-warm-600">Desde</p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs text-warm-600 mb-3 font-medium uppercase tracking-wider">Vista previa</p>
                <div className="grid grid-cols-3 gap-2">
                  {products.slice(0, 6).map((p, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-warm-100">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B5AFA6" strokeWidth="1.5">
                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {catalog.description && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-warm-600 italic">&ldquo;{catalog.description}&rdquo;</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-5">
              <p className="text-xs text-warm-600 mb-3 font-medium uppercase tracking-wider">Link para compartir</p>
              <div className="flex items-center gap-2 bg-warm-50 rounded-xl p-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B655C" strokeWidth="2" className="flex-shrink-0">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                </svg>
                <span className="text-sm text-warm-700 truncate">
                  angelinks-app.netlify.app/c/
                  {catalog.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")
                    .slice(0, 30)}
                </span>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              onClick={handleCreate}
              disabled={creating}
              className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-warm-300 text-white font-semibold py-4 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
            >
              {creating ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Publicando catálogo...
                </>
              ) : (
                "Publicar catálogo"
              )}
            </button>

            <button
              onClick={() => setStep(2)}
              className="w-full text-sm text-warm-600 hover:text-warm-800 font-medium py-2 transition-colors"
            >
              ← Volver a productos
            </button>
          </>
        )}
      </main>
    </>
  );
}
