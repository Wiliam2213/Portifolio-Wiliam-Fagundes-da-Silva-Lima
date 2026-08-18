export function SectionDivider({ className = "mb-16 md:mb-20" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="section-glow-line" />
      <div className="comet-trail" aria-hidden="true" />
    </div>
  );
}
