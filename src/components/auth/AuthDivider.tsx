export default function AuthDivider() {
  return (
    <div className="flex items-center gap-4" role="separator">
      <div className="flex-1 h-px bg-warm-200" />
      <span className="text-xs text-warm-600 uppercase tracking-wider">o</span>
      <div className="flex-1 h-px bg-warm-200" />
    </div>
  );
}
