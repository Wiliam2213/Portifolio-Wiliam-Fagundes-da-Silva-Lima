interface Planet3DProps {
  size: number;
  color: string;
  glow: string;
  image?: string;
  spinDuration?: number;
  ring?: boolean;
  atmosphere?: boolean;
  highlighted?: boolean;
  opacity?: number;
}

/**
 * Photoreal-ish CSS planet: scrolling surface texture, day/night terminator,
 * limb darkening, specular highlight and optional atmosphere + 3D ring.
 */
export function Planet3D({
  size,
  color,
  glow,
  image,
  spinDuration = 40,
  ring = false,
  atmosphere = true,
  highlighted = false,
  opacity = 1,
}: Planet3DProps) {
  return (
    <div
      className="relative"
      style={{ width: size, height: size, opacity, transformStyle: "preserve-3d" }}
    >
      {atmosphere && (
        <div
          className="planet3d__atmo"
          style={{ ["--atmo" as string]: glow, opacity: highlighted ? 1 : 0.7 }}
        />
      )}
      <div
        className="planet3d"
        style={{
          width: size,
          height: size,
          boxShadow: highlighted
            ? `0 0 ${size * 0.9}px ${size * 0.3}px ${glow}, 0 0 ${size * 2}px ${size * 0.5}px ${glow}`
            : `0 0 ${size * 0.5}px ${size * 0.14}px ${glow}`,
          transition: "box-shadow .35s ease",
        }}
      >
        <div
          className="planet3d__surface"
          style={{
            ["--spin" as string]: `${spinDuration}s`,
            backgroundColor: color,
            backgroundImage: image
              ? `url(${image})`
              : `linear-gradient(90deg, ${color}, ${color}cc, ${color}77, ${color}cc, ${color})`,
          }}
        />
        <div className="planet3d__shade" />
        <div className="planet3d__specular" />
        <div className="planet3d__rim" />
      </div>
      {ring && (
        <div
          className="planet3d-ring"
          style={{ width: size * 2.3, height: size * 2.3, filter: `drop-shadow(0 0 6px ${glow})` }}
        />
      )}
    </div>
  );
}
