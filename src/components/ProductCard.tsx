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
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-gray-600">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <p className="text-lg font-bold text-brand-700">
            ${product.sale_price.toLocaleString("es-CO")}
          </p>

          {quantity === 0 ? (
            <button
              onClick={() => onAdd(product)}
              className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors active:scale-95"
            >
              Agregar
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onRemove(product.id)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-colors"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold text-sm">
                {quantity}
              </span>
              <button
                onClick={() => onAdd(product)}
                className="w-8 h-8 rounded-lg bg-brand-600 hover:bg-brand-700 flex items-center justify-center text-white font-bold transition-colors"
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
