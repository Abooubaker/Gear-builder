// Design philosophy: Drafting Room Blue — theme the original functional editor in place; do not replace its gear math, simulation, measurement, or export logic.
const LOGO_URL = "/manus-storage/abobakernobg_69e3509e.png";

const style = document.createElement("style");
style.textContent = `
  :root { --gb-blue: #0b4f9c; --gb-deep: #073a76; --gb-ink: #062f68; --gb-paper: #d6f1fb; --gb-line: rgba(214,241,251,.35); --gb-hand: "Caveat", cursive; --gb-mono: "IBM Plex Mono", monospace; }
  html, body, #root { min-width: 320px; min-height: 100%; background-color: var(--gb-blue) !important; }
  body { overflow: hidden; background-image: linear-gradient(rgba(215,242,252,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(215,242,252,.055) 1px, transparent 1px) !important; background-size: 38px 38px !important; }
  #root { position: relative; min-height: 100dvh; color: var(--gb-paper) !important; font-family: var(--gb-hand) !important; }
  #root::before { content: ""; position: fixed; inset: 0; pointer-events:none; z-index: 999; opacity:.1; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E"); mix-blend-mode:screen; }
  #root > div:first-child { min-height:100dvh !important; height:100dvh !important; background:transparent !important; color:var(--gb-paper) !important; padding-top:72px !important; }
  #root > div:first-child > div { background:transparent !important; color:var(--gb-paper) !important; }
  #root [class*="bg-slate-50"], #root [class*="bg-slate-100"], #root [class*="bg-slate-200"], #root [class*="bg-white"], #root [class*="bg-gray"] { background-color: rgba(7,58,118,.52) !important; }
  #root [class*="dark:bg-"] { background-color: rgba(7,58,118,.52) !important; }
  #root [class*="border-slate"], #root [class*="border-gray"], #root [class*="border-zinc"] { border-color: var(--gb-line) !important; }
  #root [class*="text-slate-900"], #root [class*="text-slate-800"], #root [class*="text-slate-700"], #root [class*="text-slate-600"], #root [class*="text-slate-500"], #root [class*="text-slate-400"], #root [class*="text-zinc"] { color: rgba(214,241,251,.78) !important; }
  #root [class*="text-red-"] { color: #d6f1fb !important; }
  #root button, #root input, #root select, #root textarea { font-family: var(--gb-hand) !important; border-radius: 0 !important; }
  #root button { color: var(--gb-paper); border-color: var(--gb-line); transition: transform .16s ease, background-color .16s ease, color .16s ease !important; }
  #root button:hover { background-color: rgba(214,241,251,.12) !important; color: var(--gb-paper) !important; }
  #root input, #root select, #root textarea { color: var(--gb-paper) !important; background: transparent !important; border-color: var(--gb-line) !important; }
  #root input::placeholder { color: rgba(214,241,251,.42) !important; }
  #root svg { color: currentColor; }
  #root svg[width], #root canvas { background-color: rgba(4,47,104,.3) !important; }
  #root .gb-brand-overlay { position:fixed; top:0; left:0; right:0; z-index:1000; height:72px; display:flex; align-items:center; gap:14px; padding:12px 24px; border-bottom:1px solid var(--gb-line); background:rgba(11,79,156,.94); pointer-events:none; }
  #root .gb-brand-overlay img { width:42px; height:42px; object-fit:contain; }
  #root .gb-brand-overlay strong { display:block; color:var(--gb-paper); font:700 34px/0.8 var(--gb-hand); letter-spacing:-.05em; }
  #root .gb-brand-overlay span { display:block; margin-top:6px; color:rgba(214,241,251,.62); font:9px/1 var(--gb-mono); letter-spacing:.13em; text-transform:uppercase; }
  #root .gb-original-func-note { position:fixed; z-index:1001; top:24px; right:24px; color:rgba(214,241,251,.66); font:9px var(--gb-mono); letter-spacing:.12em; text-transform:uppercase; pointer-events:none; }
  #root [data-gb-hidden="true"] { display:none !important; }
  @media (max-width: 767px) { #root > div:first-child { padding-top:62px !important; } #root .gb-brand-overlay { height:62px; padding:10px 14px; } #root .gb-brand-overlay img { width:34px; height:34px; } #root .gb-brand-overlay strong { font-size:28px; } #root .gb-brand-overlay span { font-size:7px; } #root .gb-original-func-note { display:none; } }
`;
document.head.appendChild(style);

type ElementWithGbFlag = HTMLElement & { dataset: DOMStringMap };
const textOf = (element: Element) => (element.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
const shouldHide = (element: Element) => {
  const text = textOf(element);
  const id = (element as HTMLElement).id?.toLowerCase() || "";
  const hint = (element as HTMLElement).getAttribute("hint")?.toLowerCase() || "";
  if (id.includes("account") || id.includes("profile") || id.includes("auth")) return true;
  if (hint.includes("account") || hint.includes("profile") || hint.includes("login") || hint.includes("logout")) return true;
  if (text.includes("buy me a coffee") || text === "light" || text === "dark" || text.includes("log in") || text.includes("log out") || text.includes("login") || text.includes("logout") || text === "profile" || text.includes("sign in") || text.includes("sign out")) return true;
  return false;
};

function hideUnwantedControls(root: HTMLElement) {
  root.querySelectorAll("button, a, input, [role='button'], [id], [hint]").forEach((element) => {
    if (!shouldHide(element)) return;
    const target = (element.closest("a,button") || element) as ElementWithGbFlag;
    target.dataset.gbHidden = "true";
    if (textOf(target).includes("buy me a coffee")) {
      const card = target.closest("div[class*='border'], div[class*='rounded'], section");
      if (card) (card as ElementWithGbFlag).dataset.gbHidden = "true";
    }
  });
}

function addBrand(root: HTMLElement) {
  if (root.querySelector(".gb-brand-overlay")) return;
  const overlay = document.createElement("div");
  overlay.className = "gb-brand-overlay";
  overlay.innerHTML = `<img src="${LOGO_URL}" alt="Abo Baker logo" /><div><strong>Gearbuilder</strong><span>original gear editor · drafting bench</span></div>`;
  root.appendChild(overlay);
  const note = document.createElement("div");
  note.className = "gb-original-func-note";
  note.textContent = "DXF DRAFT / ORIGINAL ENGINE";
  root.appendChild(note);
}

function normalizeBrandText(root: HTMLElement) {
  const replacements: Array<[string, string]> = [
    ["FREE GEAR GENERATOR", "GEARBUILDER"],
    ["GEARDXF.COM", "GEARBUILDER / DRAFTING BENCH"],
    ["Loading GearDXF...", "Loading Gearbuilder..."]
  ];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    let value = node.nodeValue || "";
    replacements.forEach(([from, to]) => { value = value.replaceAll(from, to); });
    if (value !== node.nodeValue) node.nodeValue = value;
  });
}

function applyTheme() {
  const root = document.getElementById("root");
  if (!root) return;
  hideUnwantedControls(root);
  normalizeBrandText(root);
  addBrand(root);
}

const observer = new MutationObserver(applyTheme);
observer.observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener("load", applyTheme);
window.setTimeout(applyTheme, 50);
window.setTimeout(applyTheme, 500);
