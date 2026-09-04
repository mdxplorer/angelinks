import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <nav className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-sm">CL</span>
            </div>
            <span className="font-bold text-lg">CataLink</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/c/oboticario-t9-sep"
              className="bg-white text-brand-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white/90 transition-colors"
            >
              Ver demo
            </Link>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/90">
              Contraentrega — sin riesgo para ti
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
            Tu catálogo en un link.
            <br />
            <span className="text-brand-200">Tus clientes piden fácil.</span>
          </h1>

          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Convierte catálogos de O Boticário, Yanbal, Natura o cualquier marca
            en un link interactivo. Compártelo por WhatsApp. Recibe pedidos al
            instante.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/c/oboticario-t9-sep"
              className="bg-white text-brand-700 font-semibold px-8 py-4 rounded-2xl text-base hover:bg-white/90 transition-colors shadow-lg shadow-black/10"
            >
              Ver catálogo demo
            </Link>
            <Link
              href="/dashboard"
              className="bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-2xl text-base hover:bg-white/20 transition-colors border border-white/20"
            >
              Crear mi catálogo
            </Link>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">
          ¿Cómo funciona?
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          Tres pasos para maximizar tus ventas por catálogo
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="inline-flex items-center justify-center w-8 h-8 bg-brand-600 text-white text-sm font-bold rounded-full mb-3">
              1
            </div>
            <h3 className="font-semibold text-lg mb-2">Sube tus productos</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Importa desde URL, CSV, o agrégalos manualmente. Pon precios del
              catálogo y tus precios de venta.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c026d3"
                strokeWidth="2"
              >
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <div className="inline-flex items-center justify-center w-8 h-8 bg-accent-600 text-white text-sm font-bold rounded-full mb-3">
              2
            </div>
            <h3 className="font-semibold text-lg mb-2">Comparte el link</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Te generamos un link único de tu catálogo interactivo.
              Compártelo por WhatsApp, Instagram, donde quieras.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded-full mb-3">
              3
            </div>
            <h3 className="font-semibold text-lg mb-2">Recibe pedidos</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Tus clientes eligen productos y hacen pedido. Te llega al correo
              con todos los detalles. Cobras contraentrega.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Vende más, trabaja menos
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Sin inversión",
                desc: "Cobras contraentrega. Solo pagas al proveedor sobre pedido.",
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Listo en minutos",
                desc: "Sube productos, genera link, comparte. Así de rápido.",
              },
              {
                icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                title: "Pedido al instante",
                desc: "Te llega al correo con nombre, teléfono, dirección y productos.",
              },
              {
                icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
                title: "Multi-marca",
                desc: "O Boticário, Yanbal, Natura, Avon... todas tus marcas en un solo lugar.",
              },
            ].map((b, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <svg
                  className="text-brand-400 mb-4"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d={b.icon} />
                </svg>
                <h3 className="font-semibold mb-1">{b.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Empieza a vender hoy
        </h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Sin suscripción, sin comisiones, sin complicaciones. Tu catálogo, tus
          ventas, tu negocio.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors shadow-lg shadow-brand-600/20"
        >
          Crear mi primer catálogo
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">CL</span>
            </div>
            <span className="font-semibold text-sm">CataLink</span>
          </div>
          <p className="text-xs text-gray-400">
            Tu catálogo, tus ventas. Hecho para vendedores por catálogo en
            Colombia.
          </p>
        </div>
      </footer>
    </div>
  );
}
