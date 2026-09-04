import { brand } from "@/lib/content";

/**
 * O anel de 9 cores da marca, redesenhado em SVG.
 * O original era um PNG de 166×153 — este escala e adapta-se ao tema.
 */
export function Ring({ size = 26 }: { size?: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const seg = c / 9;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-label="Símbolo da Envolviver"
      className="shrink-0"
    >
      <g transform="rotate(-90 20 20)">
        {brand.rainbow.map((hex, i) => (
          <circle
            key={hex}
            cx="20"
            cy="20"
            r={r}
            fill="none"
            stroke={hex}
            strokeWidth="7"
            strokeDasharray={`${seg - 0.6} ${c - seg + 0.6}`}
            strokeDashoffset={-seg * i}
          />
        ))}
      </g>
    </svg>
  );
}

export function Wordmark({ size = 26 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Ring size={size} />
      <span
        className="font-semibold tracking-[-0.03em]"
        style={{ fontSize: size * 0.82 }}
      >
        envolviver
      </span>
    </span>
  );
}
