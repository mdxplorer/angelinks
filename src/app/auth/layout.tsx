import Logo from "@/components/Logo";
import BrandPattern from "@/components/BrandPattern";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Brand panel */}
      <div className="relative bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 lg:w-[45%] lg:min-h-screen flex items-center justify-center overflow-hidden">
        <BrandPattern className="text-white" opacity={0.1} />

        <div className="relative z-10 px-8 py-12 lg:py-0 text-center lg:text-left max-w-md">
          <Logo size="lg" className="justify-center lg:justify-start [&_span]:text-white" />

          <p className="mt-6 text-white text-lg leading-relaxed font-medium hidden lg:block">
            Tu catálogo de belleza,{" "}
            <span className="text-white">en un solo link.</span>
          </p>

          <div className="hidden lg:flex flex-col gap-4 mt-10">
            {[
              { icon: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71", text: "Comparte por WhatsApp" },
              { icon: "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3", text: "Recibe pedidos al instante" },
              { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 10v1", text: "Cobra contraentrega" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                </div>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 lg:py-0 bg-warm-50">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
