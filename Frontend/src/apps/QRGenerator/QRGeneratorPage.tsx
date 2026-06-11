import { useState, useRef } from "react";
import QRCode from "react-qr-code";

function QRGeneratorPage({ goBack }) {
  const [value, setValue] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [label, setLabel] = useState("");
  
  const qrRef = useRef(null);

  const downloadQR = () => {
    if (!qrRef.current) return;

    // Grab the actual SVG element from the wrapper container
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Set canvas size matching high-res output
      canvas.width = 500;
      canvas.height = 500;

      // Fill background color first to avoid transparent borders
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the QR code
      ctx.drawImage(img, 0, 0, 500, 500);

      const png = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = png;
      link.download = `qr-${label || "code"}.png`;
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl shadow-xl transition-all duration-300">
        
        {/* Header Navigation */}
        <button
          onClick={goBack}
          className="flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 mb-6 transition"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          QR Studio
        </h2>
        <p className="text-sm text-slate-400 mb-6">Create, style, and download customized QR codes instantly.</p>

        {/* Inputs Section */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Content / URL</label>
            <input
              type="text"
              placeholder="https://example.com"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">File Label (Optional)</label>
            <input
              type="text"
              placeholder="e.g., wifi-login"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
            />
          </div>

          {/* Color Pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">QR Color</label>
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700 rounded-lg p-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
                />
                <span className="text-xs uppercase font-mono">{fgColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Background</label>
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700 rounded-lg p-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
                />
                <span className="text-xs uppercase font-mono">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Display Area */}
        {value ? (
          <div className="mt-8 flex flex-col items-center justify-center p-6 bg-slate-900/40 rounded-xl border border-slate-700/30 group animate-fadeIn">
            <div 
              ref={qrRef} 
              className="p-4 rounded-xl shadow-inner transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: bgColor }}
            >
              <QRCode
                value={value}
                size={200}
                fgColor={fgColor}
                bgColor={bgColor}
                level="H" // High error correction capability
              />
            </div>

            <button
              onClick={downloadQR}
              className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-medium p-3 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
            >
              Download PNG
            </button>
          </div>
        ) : (
          <div className="mt-8 border-2 border-dashed border-slate-700 rounded-xl p-12 text-center text-slate-500 text-sm">
            Type something above to visualize your QR code
          </div>
        )}
      </div>
    </div>
  );
}

export default QRGeneratorPage;