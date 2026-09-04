export const THEME_KEY = "envolviver-theme";
export type Theme = "system" | "light" | "dark";

/**
 * Corre antes da pintura, inline no <head> do layout.
 * Sem isto, a página pinta no tema do sistema e só depois salta para a
 * escolha guardada — o clássico flash branco de quem prefere escuro.
 */
export const themeScript = `
(function(){
  try {
    var t = localStorage.getItem(${JSON.stringify(THEME_KEY)});
    if (t === "light" || t === "dark") {
      document.documentElement.setAttribute("data-theme", t);
    }
  } catch (e) {}
})();
`.trim();
