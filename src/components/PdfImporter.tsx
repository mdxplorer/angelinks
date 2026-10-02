"use client";

import { useState, useRef, useCallback } from "react";

const PDFJS_CDN = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build";

/* eslint-disable @typescript-eslint/no-explicit-any */
function loadPdfJs(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).pdfjsLib) {
      resolve((window as any).pdfjsLib);
      return;
    }
    const script = document.createElement("script");
    script.src = `${PDFJS_CDN}/pdf.min.js`;
    script.onload = () => {
      const lib = (window as any).pdfjsLib;
      if (lib) {
        lib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/pdf.worker.min.js`;
        resolve(lib);
      } else {
        reject(new Error("pdfjsLib not available"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load pdf.js from CDN"));
    document.head.appendChild(script);
  });
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface ExtractedProduct {
  name: string;
  price: number;
  category: string;
  description: string;
  imageDataUrl: string;
}

interface Props {
  onProductAdded: (product: ExtractedProduct) => void;
}

export default function PdfImporter({ onProductAdded }: Props) {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [cropping, setCropping] = useState(false);
  const [cropStart, setCropStart] = useState<{ x: number; y: number } | null>(null);
  const [cropEnd, setCropEnd] = useState<{ x: number; y: number } | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({ name: "", price: "", category: "General", description: "" });
  const [addedCount, setAddedCount] = useState(0);
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
      const pdfjsLib = await loadPdfJs();

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

        await page.render({ canvasContext: ctx, viewport }).promise;
        pageImages.push(canvas.toDataURL("image/jpeg", 0.85));
      }

      setPages(pageImages);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error("Error processing PDF:", msg, error);
      alert(`Error al procesar el PDF: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent, rect: DOMRect) => {
    const point = "touches" in e ? e.touches[0] || e.changedTouches[0] : e;
    return {
      x: (point.clientX - rect.left) / rect.width,
      y: (point.clientY - rect.top) / rect.height,
    };
  };

  const handlePointerDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!cropping) return;
      if ("touches" in e) e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      setCropStart(getPointerPos(e, rect));
      setCropEnd(null);
    },
    [cropping]
  );

  const handlePointerMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!cropping || !cropStart) return;
      if ("touches" in e) e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      setCropEnd(getPointerPos(e, rect));
    },
    [cropping, cropStart]
  );

  const handlePointerUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!cropping || !cropStart || selectedPage === null) return;

      const finalEnd = cropEnd || ((): { x: number; y: number } | null => {
        if ("changedTouches" in e) {
          const rect = e.currentTarget.getBoundingClientRect();
          return getPointerPos(e, rect);
        }
        return null;
      })();

      if (!finalEnd) {
        setCropStart(null);
        return;
      }

      const img = imgRef.current;
      const canvas = canvasRef.current;
      if (!img || !canvas) return;

      const natW = img.naturalWidth;
      const natH = img.naturalHeight;

      const x = Math.min(cropStart.x, finalEnd.x) * natW;
      const y = Math.min(cropStart.y, finalEnd.y) * natH;
      const w = Math.abs(finalEnd.x - cropStart.x) * natW;
      const h = Math.abs(finalEnd.y - cropStart.y) * natH;

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
    },
    [cropping, cropStart, cropEnd, selectedPage]
  );

  const addProduct = () => {
    if (!croppedImage || !productForm.name || !productForm.price) return;

    onProductAdded({
      name: productForm.name,
      price: parseFloat(productForm.price),
      category: productForm.category,
      description: productForm.description || productForm.name,
      imageDataUrl: croppedImage,
    });

    setAddedCount((c) => c + 1);
    setCroppedImage(null);
    setCropping(true);
    setProductForm({ name: "", price: "", category: "General", description: "" });
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
                  ? "border-accent-300 bg-accent-50"
                  : "border-warm-200 hover:border-accent-400 hover:bg-accent-50/50"
              }`}
            >
              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin h-8 w-8 border-4 border-accent-600 border-t-transparent rounded-full" />
                  <p className="text-sm text-accent-700 font-medium">
                    Procesando PDF...
                  </p>
                </div>
              ) : (
                <>
                  <svg
                    className="mx-auto mb-3 text-warm-400"
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
                  <p className="text-base font-medium text-warm-700">
                    Sube tu catálogo en PDF
                  </p>
                  <p className="text-sm text-warm-500 mt-1">
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
                setCroppedImage(null);
                setCropping(false);
                setAddedCount(0);
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
                  setCropping(true);
                  setCroppedImage(null);
                  setCropStart(null);
                  setCropEnd(null);
                }}
                className={`flex-shrink-0 w-24 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedPage === i
                    ? "border-accent-600 shadow-lg shadow-accent-600/20 scale-105"
                    : "border-warm-200 hover:border-warm-300"
                }`}
              >
                <img
                  src={page}
                  alt={`Página ${i + 1}`}
                  className="w-full aspect-[3/4] object-cover"
                />
                <p className="text-[10px] text-center py-1 bg-warm-50 font-medium">
                  Pág. {i + 1}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Page + Crop */}
      {selectedPage !== null && (
        <div className="bg-white rounded-2xl border border-warm-200 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-warm-100">
            <p className="font-medium text-sm">
              {croppedImage
                ? "Completa los datos del producto"
                : cropping
                ? "Dibuja un rectángulo sobre el producto"
                : `Página ${selectedPage + 1}`}
            </p>
            {!croppedImage && (
              <button
                onClick={() => setCropping(!cropping)}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                  cropping
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-accent-100 text-accent-700 hover:bg-accent-200"
                }`}
              >
                {cropping ? "Cancelar selección" : "Seleccionar producto"}
              </button>
            )}
          </div>

          {!croppedImage && (
            <div
              className={`relative ${cropping ? "cursor-crosshair" : ""}`}
              style={cropping ? { touchAction: "none" } : undefined}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
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
                  className="absolute border-2 border-accent-600 bg-accent-600/10 pointer-events-none"
                  style={selectionStyle}
                />
              )}
            </div>
          )}

          {/* Product Form (after cropping) — inside the same card */}
          {croppedImage && (
            <div className="p-5 space-y-4">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-shrink-0">
                  <img
                    src={croppedImage}
                    alt="Producto seleccionado"
                    className="w-32 h-32 object-cover rounded-xl border-2 border-warm-200 shadow-sm"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    placeholder="Nombre del producto *"
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-warm-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Precio *"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm((f) => ({ ...f, price: e.target.value }))
                      }
                      className="flex-1 px-3 py-2.5 rounded-xl border border-warm-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                    <select
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm((f) => ({ ...f, category: e.target.value }))
                      }
                      className="flex-1 px-3 py-2.5 rounded-xl border border-warm-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
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
                    className="w-full px-3 py-2.5 rounded-xl border border-warm-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={addProduct}
                      disabled={!productForm.name || !productForm.price}
                      className="bg-accent-500 hover:bg-accent-600 disabled:bg-warm-300 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                    >
                      Agregar producto
                    </button>
                    <button
                      onClick={() => {
                        setCroppedImage(null);
                        setCropping(true);
                      }}
                      className="text-sm text-warm-600 hover:text-warm-800 px-3"
                    >
                      Recortar otra vez
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden canvas for cropping */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Added count feedback */}
      {addedCount > 0 && !croppedImage && (
        <p className="text-sm text-secondary-700 bg-secondary-50 rounded-xl px-4 py-3 text-center font-medium">
          {addedCount} producto{addedCount !== 1 ? "s" : ""} agregado{addedCount !== 1 ? "s" : ""} desde el PDF.
          Selecciona otra imagen del PDF o avanza al siguiente paso.
        </p>
      )}
    </div>
  );
}
