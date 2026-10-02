"use client";

import type { Product, CartItem } from "@/types";

interface Props {
  product: Product;
  cartItem?: CartItem;
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
}

export default function ProductCard({
  product,
  cartItem,
  onAdd,
  onRemove,
}: Props) {
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="relative aspect-square bg-warm-200 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B5AFA6" strokeWidth="1.5">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-warm-600">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2 text-warm-800">
          {product.name}
        </h3>
        <p className="text-xs text-warm-600 line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <p className="text-lg font-bold text-accent-600">
            ${product.sale_price.toLocaleString("es-CO")}
          </p>

          {quantity === 0 ? (
            <button
              onClick={() => onAdd(product)}
              className="bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors active:scale-95"
            >
              Agregar
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onRemove(product.id)}
                className="w-8 h-8 rounded-lg bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-warm-600 font-bold transition-colors"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold text-sm">
                {quantity}
              </span>
              <button
                onClick={() => onAdd(product)}
                className="w-8 h-8 rounded-lg bg-accent-500 hover:bg-accent-600 flex items-center justify-center text-white font-bold transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
