/*
 * Roda no <head>, ANTES da primeira pintura, para o tema certo já aparecer sem
 * "piscar". Padrão: escuro (identidade do site); o botão salva a escolha.
 */
export const THEME_KEY = "theme";

export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");document.documentElement.dataset.theme=(t==="light"||t==="dark")?t:"dark"}catch(e){document.documentElement.dataset.theme="dark"}})();`;
