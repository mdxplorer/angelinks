"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface ExtractedProduct {
  name: string;
  price: number;
  category: string;
  description: string;
  imageDataUrl: string;
}

interface Props {
  onProductsReady: (products: ExtractedProduct[]) => void;
}

export default function PdfImporter({ onProductsReady }: Props) {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [products, setProducts] = useState<ExtractedProduct[]>([]);
  const [cropping, setCropping] = useState(false);
  const [cropStart, setCropStart] = useState<{ x: number; y: number } | null>(null);
  const [cropEnd, setCropEnd] = useState<{ x: number; y: number } | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({ name: "", price: "", category: "General", description: "" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;

    setLoading(true);
    setPages([]);
    setSelectedPage(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const pageImages: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const scale = 2;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;

        await page.render({ canvasContext: ctx, viewport, canvas } as never).promise;
        pageImages.push(canvas.toDataURL("image/jpeg", 0.85));
      }

      setPages(pageImages);
    } catch (error) {
      console.error("Error processing PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cropping) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setCropStart({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
      setCropEnd(null);
    },
    [cropping]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cropping || !cropStart) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setCropEnd({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    },
    [cropping, cropStart]
  );

  const handleMouseUp = useCallback(() => {
    if (!cropping || !cropStart || !cropEnd || selectedPage === null) return;

    const img = imgRef.current;
    if (!img) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const natW = img.naturalWidth;
    const natH = img.naturalHeight;

    const x = Math.min(cropStart.x, cropEnd.x) * natW;
    const y = Math.min(cropStart.y, cropEnd.y) * natH;
    const w = Math.abs(cropEnd.x - cropStart.x) * natW;
    const h = Math.abs(cropEnd.y - cropStart.y) * natH;

    if (w < 20 || h < 20) {
      setCropStart(null);
      setCropEnd(null);
      return;
    }

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, x, y, w, h, 0, 0, w, h);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCroppedImage(dataUrl);
    setCropping(false);
    setCropStart(null);
    setCropEnd(null);
  }, [cropping, cropStart, cropEnd, selectedPage]);

  const addProduct = () => {
    if (!croppedImage || !productForm.name || !productForm.price) return;

    const newProduct: ExtractedProduct = {
      name: productForm.name,
      price: parseFloat(productForm.price),
      category: productForm.category,
      description: productForm.description || productForm.name,
      imageDataUrl: croppedImage,
    };

    setProducts((prev) => [...prev, newProduct]);
    setCroppedImage(null);
    setProductForm({ name: "", price: "", category: "General", description: "" });
  };

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const selectionStyle =
    cropStart && cropEnd
      ? {
          left: `${Math.min(cropStart.x, cropEnd.x) * 100}%`,
          top: `${Math.min(cropStart.y, cropEnd.y) * 100}%`,
          width: `${Math.abs(cropEnd.x - cropStart.x) * 100}%`,
          height: `${Math.abs(cropEnd.y - cropStart.y) * 100}%`,
        }
      : null;

  return (
    <div className="space-y-6">
      {/* Upload */}
      {pages.length === 0 && (
        <div>
          <label className="block">
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
                loading
                  ? "border-brand-300 bg-brand-50"
                  : "border-gray-200 hover:border-brand-400 hover:bg-brand-50/50"
              }`}
            >
              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full" />
                  <p className="text-sm text-brand-700 font-medium">
                    Procesando PDF...
                  </p>
                </div>
              ) : (
                <>
                  <svg
                    className="mx-auto mb-3 text-gray-400"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <p className="text-base font-medium text-gray-700">
                    Sube tu catálogo en PDF
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Arrastra o haz clic para seleccionar
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Page Thumbnails */}
      {pages.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">
              Páginas del catálogo ({pages.length})
            </h3>
            <button
              onClick={() => {
                setPages([]);
                setSelectedPage(null);
                setProducts([]);
              }}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Cambiar PDF
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {pages.map((page, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedPage(i);
                  setCropping(false);
                  setCroppedImage(null);
                }}
                className={`flex-shrink-0 w-24 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedPage === i
                    ? "border-brand-600 shadow-lg shadow-brand-600/20 scale-105"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={page}
                  alt={`Página ${i + 1}`}
                  className="w-full aspect-[3/4] object-cover"
                />
                <p className="text-[10px] text-center py-1 bg-gray-50 font-medium">
                  Pág. {i + 1}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Page + Crop */}
      {selectedPage !== null && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <p className="font-medium text-sm">
              Página {selectedPage + 1} — {cropping ? "Dibuja un rectángulo sobre el producto" : "Selecciona un producto"}
            </p>
            {!croppedImage && (
              <button
                onClick={() => setCropping(!cropping)}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                  cropping
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-brand-100 text-brand-700 hover:bg-brand-200"
                }`}
              >
                {cropping ? "Cancelar selección" : "Seleccionar producto"}
              </button>
            )}
          </div>
          <div
            className={`relative ${cropping ? "cursor-crosshair" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <img
              ref={imgRef}
              src={pages[selectedPage]}
              alt={`Página ${selectedPage + 1}`}
              className="w-full select-none"
              draggable={false}
            />
            {selectionStyle && (
              <div
                className="absolute border-2 border-brand-600 bg-brand-600/10 pointer-events-none"
                style={selectionStyle}
              />
            )}
          </div>
        </div>
      )}

      {/* Hidden canvas for cropping */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Product Form (after cropping) */}
      {croppedImage && (
        <div className="bg-brand-50 rounded-2xl p-5 border border-brand-200">
          <h3 className="font-semibold mb-4 text-brand-800">
            Agregar producto
          </h3>
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-shrink-0">
              <img
                src={croppedImage}
                alt="Producto seleccionado"
                className="w-32 h-32 object-cover rounded-xl border-2 border-white shadow-sm"
              />
            </div>
            <div className="flex-1 space-y-3">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={productForm.name}
                onChange={(e) =>
                  setProductForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Precio"
                  value={productForm.price}
                  onChange={(e) =>
                    setProductForm((f) => ({ ...f, price: e.target.value }))
                  }
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <select
                  value={productForm.category}
                  onChange={(e) =>
                    setProductForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  <option>General</option>
                  <option>Perfumería</option>
                  <option>Cuidado Corporal</option>
                  <option>Maquillaje</option>
                  <option>Cabello</option>
                  <option>Skincare</option>
                  <option>Kits</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Descripción (opcional)"
                value={productForm.description}
                onChange={(e) =>
                  setProductForm((f) => ({ ...f, description: e.target.value }))
                }
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={addProduct}
                  disabled={!productForm.name || !productForm.price}
                  className="bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                >
                  Agregar
                </button>
                <button
                  onClick={() => {
                    setCroppedImage(null);
                    setCropping(true);
                  }}
                  className="text-sm text-gray-600 hover:text-gray-800 px-3"
                >
                  Recortar otra vez
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      {products.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">
              Productos extraídos ({products.length})
            </h3>
            <button
              onClick={() => onProductsReady(products)}
              className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              Crear catálogo con {products.length} productos
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((product, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
              >
                <div className="relative aspect-square">
                  <img
                    src={product.imageDataUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeProduct(i)}
                    className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    X
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium truncate">{product.name}</p>
                  <p className="text-sm font-bold text-brand-700">
                    ${product.price.toLocaleString("es-CO")}
                  </p>
                  <p className="text-[10px] text-gray-500">{product.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
