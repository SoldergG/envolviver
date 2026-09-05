export const THEME_KEY = "envolviver-theme";
export type Theme = "system" | "light" | "dark";

/**
 * O tema por omissão é claro, mesmo em dispositivos com o sistema em
 * escuro. Só muda por escolha explícita no rodapé — incluindo a opção
 * "Sistema", que é opt-in e não o comportamento de origem.
 */
export const DEFAULT_THEME: Theme = "light";

/**
 * Corre antes da pintura, inline no <head> do layout.
 * Sem isto, a página pintava com o tema de origem e só depois saltava
 * para a escolha guardada.
 */
export const themeScript = `
(function(){
  var t = ${JSON.stringify(DEFAULT_THEME)};
  try {
    var s = localStorage.getItem(${JSON.stringify(THEME_KEY)});
    if (s === "light" || s === "dark" || s === "system") t = s;
  } catch (e) {}

  var root = document.documentElement;
  root.setAttribute("data-theme", t);

  // A cor da barra do browser acompanha o tema em uso.
  var dark = t === "dark" ||
    (t === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  var m = document.querySelector('meta[name="theme-color"]');
  if (!m) {
    m = document.createElement("meta");
    m.setAttribute("name", "theme-color");
    document.head.appendChild(m);
  }
  m.setAttribute("content", dark ? "#000000" : "#ffffff");
})();
`.trim();
