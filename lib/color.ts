/**
 * Escolhe texto claro ou escuro sobre uma cor de marca, pela
 * luminância relativa WCAG. O amarelo (#fcd805) e o lima (#c9cc2c)
 * dão ~1.3:1 com branco — falham AA de forma grave.
 */
const INK = "#1d1d1f";
const INK_LUMINANCE = 0.0114;

function channel(v: number) {
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const r = channel(parseInt(h.slice(0, 2), 16) / 255);
  const g = channel(parseInt(h.slice(2, 4), 16) / 255);
  const b = channel(parseInt(h.slice(4, 6), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Cor de texto legível sobre `hex` — a que der maior contraste. */
export function onColor(hex: string): string {
  const L = luminance(hex);
  const againstWhite = 1.05 / (L + 0.05);
  const againstInk = (L + 0.05) / (INK_LUMINANCE + 0.05);
  return againstInk > againstWhite ? INK : "#ffffff";
}

/** Rácio de contraste entre duas cores — usado nos testes. */
export function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/* ------------------------------------------------------------------
   Variantes legíveis dos acentos.
   O amarelo (#fcd805) e o lima (#c9cc2c) desaparecem sobre branco;
   o índigo (#6e7ca6) desaparece sobre preto. Escurecemos ou
   clareamos cada cor até atingir 3:1 contra o fundo do tema — o
   limiar WCAG para elementos gráficos não-textuais — mantendo a
   matiz reconhecível.
   ------------------------------------------------------------------ */

function toRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function toHex([r, g, b]: [number, number, number]): string {
  const c = (v: number) =>
    Math.round(Math.min(255, Math.max(0, v)))
      .toString(16)
      .padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** Acento visível sobre o fundo do tema (mín. 3:1). */
export function accent(hex: string, theme: "light" | "dark"): string {
  const bg = theme === "light" ? "#ffffff" : "#000000";
  let rgb = toRgb(hex);

  for (let i = 0; i < 24; i++) {
    if (contrast(toHex(rgb), bg) >= 3) break;
    rgb = (theme === "light"
      ? rgb.map((v) => v * 0.9)
      : rgb.map((v) => v + (255 - v) * 0.12)) as [number, number, number];
  }
  return toHex(rgb);
}

/** Par de variáveis CSS para um acento que troca com o tema. */
export function accentVars(hex: string) {
  return {
    "--accent": accent(hex, "light"),
    "--accent-dark": accent(hex, "dark"),
  } as React.CSSProperties;
}
