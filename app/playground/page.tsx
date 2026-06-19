'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Sliders, RefreshCw, Layers } from 'lucide-react';
import type { ReactElement } from 'react';

export default function PlaygroundPage(): ReactElement {
  const [hOffset, setHOffset] = useState(0);
  const [vOffset, setVOffset] = useState(12);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(-5);
  const [color, setColor] = useState('#6366f1');
  const [opacity, setOpacity] = useState(25);
  const [radius, setRadius] = useState(24);
  const [copied, setCopied] = useState(false);

  // Convert hex color to rgba
  const hexToRgba = (hex: string, op: number) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${op / 100})`;
  };

  const rgbaColor = hexToRgba(color, opacity);
  const boxShadowValue = `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${rgbaColor}`;
  const borderRadiusValue = `${radius}px`;

  // Code formats
  const tailwindCode = `shadow-[${hOffset}px_${vOffset}px_${blur}px_${spread}px_${rgbaColor.replace(/\s+/g, '')}] rounded-[${radius}px]`;
  const cssCode = `box-shadow: ${boxShadowValue};\nborder-radius: ${borderRadiusValue};`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setHOffset(0);
    setVOffset(12);
    setBlur(30);
    setSpread((-5));
    setColor('#6366f1');
    setOpacity(25);
    setRadius(24);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <header className="mb-12 max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            07 / Developer Playground
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            CSS Shadow Builder
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            A real-time sandbox utility to design, fine-tune, and export box shadow gradients and borders directly to standard Tailwind classes.
          </p>
        </header>

        {/* Main Interface Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-card border border-border rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="flex items-center gap-2 font-bold text-sm text-foreground">
                <Sliders size={16} className="text-primary" />
                UI Parameters
              </span>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <RefreshCw size={12} />
                Reset
              </button>
            </div>

            {/* H Offset */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">Horizontal Offset</span>
                <span className="font-mono text-foreground">{hOffset}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={hOffset}
                onChange={(e) => setHOffset(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* V Offset */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">Vertical Offset</span>
                <span className="font-mono text-foreground">{vOffset}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={vOffset}
                onChange={(e) => setVOffset(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Blur */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">Blur Radius</span>
                <span className="font-mono text-foreground">{blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Spread */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">Spread Radius</span>
                <span className="font-mono text-foreground">{spread}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={spread}
                onChange={(e) => setSpread(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Border Radius */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">Border Radius</span>
                <span className="font-mono text-foreground">{radius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Color picker */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground">Shadow Color</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono font-semibold uppercase">{color}</span>
                </div>
              </div>

              {/* Opacity */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Opacity</span>
                  <span className="font-mono text-foreground">{opacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Preview & Output Panel */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Preview Box */}
            <div className="relative aspect-video rounded-2xl border border-border bg-muted/30 flex items-center justify-center p-8 overflow-hidden">
              {/* Background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
              
              <div
                className="w-48 h-32 bg-card border border-border flex flex-col items-center justify-center text-center p-4 transition-all duration-300"
                style={{
                  boxShadow: boxShadowValue,
                  borderRadius: borderRadiusValue,
                }}
              >
                <Layers className="h-6 w-6 text-primary mb-2 animate-bounce" />
                <span className="text-xs font-bold text-foreground">Aesthetic Card</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Real-time styling shadow</span>
              </div>
            </div>

            {/* Code Output Box */}
            <div className="bg-zinc-950 dark:bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4 font-mono text-xs">
              
              {/* Tailwind export */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-emerald-500">Tailwind CSS Classes</span>
                  <button
                    onClick={() => handleCopy(tailwindCode)}
                    className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="bg-zinc-900 dark:bg-zinc-950/60 p-3 rounded-lg text-zinc-100 overflow-x-auto select-all border border-zinc-800/40 whitespace-pre-wrap leading-relaxed break-all">
                  {tailwindCode}
                </pre>
              </div>

              {/* Standard CSS export */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-primary">Vanilla CSS Code</span>
                  <button
                    onClick={() => handleCopy(cssCode)}
                    className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="bg-zinc-900 dark:bg-zinc-950/60 p-3 rounded-lg text-zinc-100 overflow-x-auto select-all border border-zinc-800/40 whitespace-pre-wrap leading-relaxed">
                  {cssCode}
                </pre>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
