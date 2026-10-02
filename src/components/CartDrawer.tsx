"use client";

import type { CartItem } from "@/types";

interface Props {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onCheckout,
}: Props) {
  const total = items.reduce(
    (sum, item) => sum + item.product.sale_price * item.quantity,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-warm-200">
          <div>
            <h2 className="text-lg font-display font-bold text-warm-800">Tu pedido</h2>
            <p className="text-sm text-warm-600">
              {totalItems} {totalItems === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-warm-100 hover:bg-warm-200 flex items-center justify-center transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-warm-500">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              <p className="mt-3 text-sm">Tu carrito está vacío</p>
              <p className="text-xs mt-1">Agrega productos del catálogo</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 bg-warm-50 rounded-xl p-3"
              >
                {item.product.image_url ? (
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-warm-200 flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B5AFA6" strokeWidth="1.5">
                      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate text-warm-800">
                    {item.product.name}
                  </h4>
                  <p className="text-sm font-bold text-accent-600 mt-1">
                    $
                    {(item.product.sale_price * item.quantity).toLocaleString(
                      "es-CO"
                    )}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="w-7 h-7 rounded-md bg-white border border-warm-200 flex items-center justify-center text-warm-600 hover:bg-warm-100 text-sm"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="w-7 h-7 rounded-md bg-white border border-warm-200 flex items-center justify-center text-warm-600 hover:bg-warm-100 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-warm-200 p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-warm-600">Total</span>
              <span className="text-2xl font-bold text-accent-600">
                ${total.toLocaleString("es-CO")}
              </span>
            </div>
            <p className="text-xs text-warm-600 text-center">
              Pago contraentrega — pagas cuando recibes
            </p>
            <button
              onClick={onCheckout}
              className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3.5 rounded-xl transition-colors active:scale-[0.98] text-base"
            >
              Hacer pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
}
