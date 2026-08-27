// Design philosophy: Drafting Room Blue — technical sketchbook modernism, deep cobalt paper, hand-inked hierarchy.
// This page keeps tools beside the drawing and treats every interaction as a mark on the sheet.
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownToLine,
  Crosshair,
  Eraser,
  Expand,
  Hand,
  MousePointer2,
  PencilRuler,
  RotateCcw,
  Ruler,
  Sparkles,
  SquareDashedMousePointer,
  Trash2,
} from "lucide-react";

const LOGO_URL = "/manus-storage/abobaker_7d23ff46.webp";
const HERO_URL = "/manus-storage/geardxf-blueprint-hero_c7d6a881.png";
const DETAIL_URL = "/manus-storage/geardxf-tooth-detail_4d0d44d2.png";

const VIEWBOX = { width: 1000, height: 640 };
const MM_PER_CANVAS_UNIT = 0.12;

type ToolName = "select" | "measure" | "pan";
type Point = { x: number; y: number };

function gearPath(teeth: number, outerRadius: number, rootRadius: number, cx: number, cy: number) {
  const points: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let index = 0; index < teeth; index += 1) {
    const base = index * step - Math.PI / 2;
    const tooth = [
      [base, rootRadius],
      [base + step * 0.16, rootRadius],
      [base + step * 0.22, outerRadius],
      [base + step * 0.68, outerRadius],
      [base + step * 0.74, rootRadius],
      [base + step, rootRadius],
    ];
    tooth.forEach(([angle, radius], pointIndex) => {
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      points.push(`${index === 0 && pointIndex === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    });
  }
  return `${points.join(" ")} Z`;
}

function distance(a: Point, b: Point) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function formatNumber(value: number, digits = 2) {
  return value.toFixed(digits).replace(/\.00$/, "");
}

function pointToMm(point: Point) {
  return {
    x: (point.x - VIEWBOX.width / 2) * MM_PER_CANVAS_UNIT,
    y: (VIEWBOX.height / 2 - point.y) * MM_PER_CANVAS_UNIT,
  };
}

function buildSvg(teeth: number, outerRadius: number, rootRadius: number, bore: number, pressureAngle: number) {
  const path = gearPath(teeth, outerRadius, rootRadius, 500, 320);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="640" viewBox="0 0 1000 640"><rect width="1000" height="640" fill="#0b4f9c"/><g fill="none" stroke="#a8d9ee" stroke-width="2"><circle cx="500" cy="320" r="${outerRadius}"/><circle cx="500" cy="320" r="${rootRadius}"/><circle cx="500" cy="320" r="${(outerRadius + rootRadius) / 2}" stroke-dasharray="10 8"/><path d="${path}" stroke="#d6f1fb" stroke-width="4"/><circle cx="500" cy="320" r="${bore / MM_PER_CANVAS_UNIT / 2}"/></g><g fill="#d6f1fb" font-family="monospace" font-size="16"><text x="40" y="52">GEAR DXF / HAND DRAFT</text><text x="40" y="78">${teeth}T · ${pressureAngle}° · BORE ${bore} MM</text></g></svg>`;
}

export default function Home() {
  const [tool, setTool] = useState<ToolName>("select");
  const [points, setPoints] = useState<Point[]>([]);
  const [teeth, setTeeth] = useState(24);
  const [module, setModule] = useState(2.5);
  const [pressureAngle, setPressureAngle] = useState(20);
  const [bore, setBore] = useState(18);
  const canvasRef = useRef<SVGSVGElement | null>(null);

  const outerRadius = useMemo(() => Math.max(124, teeth * module * 2.1), [teeth, module]);
  const rootRadius = useMemo(() => outerRadius * 0.79, [outerRadius]);
  const pitchRadius = useMemo(() => outerRadius * 0.9, [outerRadius]);
  const measuredDistance = points.length === 2 ? distance(points[0], points[1]) * MM_PER_CANVAS_UNIT : null;
  const firstMm = points[0] ? pointToMm(points[0]) : null;
  const secondMm = points[1] ? pointToMm(points[1]) : null;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPoints([]);
        setTool("select");
      }
      if (event.key.toLowerCase() === "m") setTool("measure");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleCanvasClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (tool !== "measure" || !canvasRef.current) return;
    const bounds = canvasRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * VIEWBOX.width;
    const y = ((event.clientY - bounds.top) / bounds.height) * VIEWBOX.height;
    const nextPoint = { x, y };
    setPoints((current) => (current.length >= 2 ? [nextPoint] : [...current, nextPoint]));
  };

  const exportGear = () => {
    const svg = buildSvg(teeth, outerRadius, rootRadius, bore, pressureAngle);
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `geardxf-${teeth}t.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const resetDraft = () => {
    setTeeth(24);
    setModule(2.5);
    setPressureAngle(20);
    setBore(18);
    setPoints([]);
    setTool("select");
  };

  const tools: Array<{ id: ToolName; label: string; hint: string; icon: typeof MousePointer2 }> = [
    { id: "select", label: "Select", hint: "Inspect the drawing", icon: MousePointer2 },
    { id: "measure", label: "Measure distance", hint: "Click any two points", icon: Ruler },
    { id: "pan", label: "Pan sheet", hint: "Move around the plan", icon: Hand },
  ];

  return (
    <main className="blueprint-app">
      <header className="top-rail">
        <div className="brand-lockup">
          <div className="brand-stamp" aria-label="Abobaker logo">
            <img src={LOGO_URL} alt="Abobaker logo" />
          </div>
          <div>
            <p className="eyebrow">FIELD NOTE 01 / DIGITAL DRAFTING BENCH</p>
            <h1>GearDXF</h1>
            <p className="brand-subline">draw it clean · cut it true</p>
          </div>
        </div>
        <div className="rail-note">
          <span className="rail-dot" />
          <span>LOCAL SHEET / READY</span>
          <span className="rail-divider" />
          <span>MM</span>
        </div>
      </header>

      <div className="workspace">
        <aside className="tool-column">
          <section className="note-block intro-note">
            <div className="note-index">A—01</div>
            <p className="note-kicker">A SMALL CAD BENCH</p>
            <h2>Put a gear on paper.</h2>
            <p className="note-copy">Tune the tooth count, mark the bore, then check any distance directly on the sheet.</p>
          </section>

          <section className="tool-panel" aria-labelledby="tools-heading">
            <div className="section-label" id="tools-heading"><span>01</span> DRAWING TOOLS</div>
            <div className="tool-list">
              {tools.map(({ id, label, hint, icon: Icon }) => (
                <button
                  className={`tool-button ${tool === id ? "is-active" : ""}`}
                  key={id}
                  type="button"
                  onClick={() => setTool(id)}
                  aria-pressed={tool === id}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>
                    <strong>{label}</strong>
                    <small>{hint}</small>
                  </span>
                  {id === "measure" && <kbd>M</kbd>}
                </button>
              ))}
            </div>
          </section>

          <section className="tool-panel parameter-panel" aria-labelledby="parameters-heading">
            <div className="section-label" id="parameters-heading"><span>02</span> GEAR PARAMETERS</div>
            <label className="field-row">
              <span>Teeth</span>
              <input type="number" min="6" max="96" value={teeth} onChange={(event) => setTeeth(Number(event.target.value) || 6)} />
            </label>
            <label className="field-row">
              <span>Module</span>
              <input type="number" min="0.5" max="12" step="0.1" value={module} onChange={(event) => setModule(Number(event.target.value) || 0.5)} />
            </label>
            <label className="field-row">
              <span>Pressure angle</span>
              <span className="field-with-unit"><input type="number" min="14.5" max="35" step="0.5" value={pressureAngle} onChange={(event) => setPressureAngle(Number(event.target.value) || 20)} /><em>°</em></span>
            </label>
            <label className="field-row">
              <span>Bore</span>
              <span className="field-with-unit"><input type="number" min="0" max="200" step="0.5" value={bore} onChange={(event) => setBore(Number(event.target.value) || 0)} /><em>mm</em></span>
            </label>
            <div className="parameter-readout">
              <span>Pitch diameter</span>
              <strong>{formatNumber(pitchRadius * 2 * MM_PER_CANVAS_UNIT)} mm</strong>
            </div>
          </section>

          <button className="ink-button secondary-button" type="button" onClick={resetDraft}>
            <RotateCcw size={16} /> Reset sheet
          </button>
        </aside>

        <section className="drawing-column">
          <div className="canvas-heading">
            <div>
              <div className="section-label"><span>03</span> WORKING SHEET</div>
              <p className="canvas-caption">{tool === "measure" ? "MEASURE MODE / CLICK ANY TWO POINTS" : "GEAR CONSTRUCTION / LIVE PREVIEW"}</p>
            </div>
            <div className="canvas-actions">
              <button type="button" className="small-icon-button" aria-label="Clear measurement" onClick={() => setPoints([])} title="Clear measurement"><Eraser size={16} /></button>
              <button type="button" className="ink-button export-button" onClick={exportGear}><ArrowDownToLine size={16} /> Export SVG</button>
            </div>
          </div>

          <div className={`drawing-surface ${tool === "measure" ? "measure-ready" : ""}`} style={{ backgroundImage: `url(${HERO_URL})` }}>
            <div className="surface-wash" />
            <div className="corner-mark top-left">X—00</div>
            <div className="corner-mark top-right">N ↑</div>
            <svg ref={canvasRef} className="gear-canvas" viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} role="img" aria-label="Interactive gear blueprint. Use measure mode to click any two points." onClick={handleCanvasClick}>
              <defs>
                <filter id="roughen" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="9" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.15" />
                </filter>
              </defs>
              <g className="construction-lines" opacity="0.68">
                <circle cx="500" cy="320" r={outerRadius + 25} />
                <circle cx="500" cy="320" r={rootRadius - 18} />
                <line x1="80" y1="320" x2="920" y2="320" />
                <line x1="500" y1="60" x2="500" y2="580" />
                <path d="M 500 320 L 760 320 M 500 320 L 500 82" strokeDasharray="8 10" />
              </g>
              <g className="gear-ink" filter="url(#roughen)">
                <path d={gearPath(teeth, outerRadius, rootRadius, 500, 320)} />
                <circle cx="500" cy="320" r={pitchRadius} className="pitch-circle" />
                <circle cx="500" cy="320" r={Math.max(6, (bore / MM_PER_CANVAS_UNIT) / 2)} className="bore-circle" />
                <circle cx="500" cy="320" r="8" className="center-mark" />
              </g>
              <g className="annotation-lines">
                <path d={`M 500 ${320 - outerRadius - 22} L 500 ${320 - outerRadius - 55} L 690 ${320 - outerRadius - 55}`} />
                <path d={`M 500 ${320 + rootRadius + 18} L 500 ${320 + rootRadius + 52} L 700 ${320 + rootRadius + 52}`} />
              </g>
              <g className="canvas-annotations">
                <text x="704" y={320 - outerRadius - 49}>OUTER PROFILE</text>
                <text x="714" y={320 + rootRadius + 58}>ROOT CIRCLE</text>
                <text x="62" y="574">NOMINAL SCALE 1 : 10</text>
                <text x="720" y="574">SHEET 001 / A4</text>
              </g>
              {points.map((point, index) => (
                <g key={`${point.x}-${point.y}`} className="measure-point">
                  <circle cx={point.x} cy={point.y} r="9" />
                  <circle cx={point.x} cy={point.y} r="3" />
                  <line x1={point.x - 18} y1={point.y} x2={point.x + 18} y2={point.y} />
                  <line x1={point.x} y1={point.y - 18} x2={point.x} y2={point.y + 18} />
                  <text x={point.x + 14} y={point.y - 14}>P{index + 1}</text>
                </g>
              ))}
              {points.length === 2 && (
                <g className="measure-line">
                  <line x1={points[0].x} y1={points[0].y} x2={points[1].x} y2={points[1].y} />
                  <line x1={points[0].x} y1={points[0].y - 14} x2={points[0].x} y2={points[0].y + 14} />
                  <line x1={points[1].x} y1={points[1].y - 14} x2={points[1].x} y2={points[1].y + 14} />
                </g>
              )}
            </svg>
            <div className="surface-footer-note"><Crosshair size={15} /> {tool === "measure" ? "Any point on the sheet is fair game." : "Construction lines are live."}</div>
            {measuredDistance !== null && firstMm && secondMm ? (
              <aside className="measurement-card" aria-live="polite">
                <div className="measurement-card-head"><span>FIELD MEASUREMENT</span><button type="button" aria-label="Clear measurement" onClick={() => setPoints([])}><Trash2 size={15} /></button></div>
                <strong>{formatNumber(measuredDistance)} <small>mm</small></strong>
                <div className="measurement-coordinates"><span>P1 <b>{formatNumber(firstMm.x)}, {formatNumber(firstMm.y)}</b></span><span>P2 <b>{formatNumber(secondMm.x)}, {formatNumber(secondMm.y)}</b></span></div>
                <p>Click anywhere to start a new measure.</p>
              </aside>
            ) : tool === "measure" ? (
              <aside className="measurement-card waiting-card"><div className="measurement-card-head"><span>FIELD MEASUREMENT</span><Ruler size={15} /></div><strong>{points.length === 1 ? "Pick P2" : "Pick P1"}</strong><p>Click any two points in the sheet. Not limited to gear edges.</p></aside>
            ) : null}
          </div>

          <div className="under-sheet">
            <figure className="detail-card">
              <img src={DETAIL_URL} alt="Hand-drawn gear tooth detail" />
              <figcaption><span>DETAIL NOTE 04</span><strong>Leave room for the cutter.</strong></figcaption>
            </figure>
            <div className="work-notes">
              <div className="note-line"><Sparkles size={16} /><span>Quick note</span></div>
              <p>Measure mode is deliberately unrestricted. Tap the ruler, then tap any two locations on the sheet — inside the gear, outside it, or across the whole canvas.</p>
              <div className="shortcut-line"><SquareDashedMousePointer size={15} /><span>Shortcut: press <kbd>M</kbd> to measure · <kbd>Esc</kbd> to clear</span></div>
            </div>
          </div>
        </section>
      </div>

      <footer className="bottom-rail">
        <div><PencilRuler size={15} /> BUILT FOR THE MOMENT BEFORE THE CUT</div>
        <div><Expand size={15} /> DRAGGING PAPER / DIGITAL INK / NO ACCOUNT NEEDED</div>
      </footer>
    </main>
  );
}
