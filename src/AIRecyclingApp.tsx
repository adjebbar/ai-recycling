// src/AIRecyclingApp.tsx
// Composant React moderne pour ton app AI Recycling
// - Utilise TailwindCSS + shadcn/ui + lucide-react
// - Remplace le runInference() par ton vrai backend plus tard

import React, { useState, useRef } from "react";
import { Camera } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ScanResult {
  label: string;
  confidence: number;
  recycleTip: string;
  ts?: number;
}

export default function AIRecyclingApp() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<ScanResult[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setImage(url);
    setResult(null);
  }

  async function runInference() {
    if (!image) return;
    setLoading(true);
    setResult(null);

    try {
      // ⚠️ À remplacer par ton vrai backend (FastAPI, Flask, etc.)
      await new Promise((r) => setTimeout(r, 900));
      const fake: ScanResult = {
        label: "Plastic",
        confidence: 0.93,
        recycleTip: "Rinse and put in plastic bin",
      };
      setResult(fake);
      setHistory((h) => [{ ...fake, ts: Date.now() }, ...h].slice(0, 12));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    setImage(null);
    setResult(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">
              AI Recycling — Identify & Learn
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Snap or upload an item and get instant recycling guidance.
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <Button variant="ghost">Sign in</Button>
            <Button>Try Demo</Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload & camera */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Scan or Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 p-4">
                {image ? (
                  <img
                    src={image}
                    alt="upload preview"
                    className="max-h-72 object-contain rounded-md shadow-sm"
                  />
                ) : (
                  <div className="flex flex-col items-center text-center p-8">
                    <Camera className="w-14 h-14 text-slate-400" />
                    <p className="mt-3 text-slate-600">
                      Drop an image or take a photo
                    </p>
                    <div className="mt-4 flex gap-2">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          ref={inputRef}
                          type="file"
                          accept="image/*"
                          onChange={onPickFile}
                          className="hidden"
                        />
                        <Button asChild>
                          <span>Upload</span>
                        </Button>
                      </label>
                    </div>
                  </div>
                )}

                <div className="w-full mt-4 flex gap-2">
                  <Button
                    onClick={runInference}
                    disabled={!image || loading}
                  >
                    {loading ? "Analyzing…" : "Analyze"}
                  </Button>
                  <Button variant="ghost" onClick={clear}>
                    Clear
                  </Button>
                </div>

                {loading && (
                  <div className="w-full mt-4">
                    <Progress value={60} />
                    <p className="text-xs text-slate-500 mt-2">
                      Running model inference...
                    </p>
                  </div>
                )}
              </div>

              {/* Tips & history */}
              <div className="md:w-80">
                <h3 className="text-sm font-semibold">Quick Tips</h3>
                <ul className="mt-2 text-sm text-slate-600 space-y-2">
                  <li>
                    Crop image to show just the item for best results.
                  </li>
                  <li>Good lighting improves detection accuracy.</li>
                  <li>
                    Tap an entry in history to reuse the image for
                    re-check.
                  </li>
                </ul>

                <div className="mt-4">
                  <h4 className="text-xs uppercase text-slate-500">
                    Recent scans
                  </h4>
                  <div className="mt-2 space-y-2 max-h-40 overflow-auto">
                    {history.length === 0 && (
                      <p className="text-sm text-slate-400">
                        No history yet
                      </p>
                    )}
                    {history.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-slate-50 p-2 rounded"
                      >
                        <div>
                          <div className="text-sm font-medium">
                            {h.label}
                          </div>
                          <div className="text-xs text-slate-500">
                            {(h.confidence * 100).toFixed(0)}% •{" "}
                            {new Date(h.ts || 0).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setResult(h);
                            }}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold">
                      {result.label}
                    </div>
                    <div className="text-sm text-slate-500">
                      Confidence: {(result.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">Recycle</div>
                    <div className="text-xs text-slate-500">
                      {result.recycleTip}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h5 className="text-sm font-semibold">How to prepare</h5>
                  <p className="text-sm text-slate-600 mt-2">
                    {result.recycleTip} • Remove caps • Rinse when
                    necessary • Flatten if possible.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h5 className="text-sm font-semibold">Why it matters</h5>
                  <p className="text-sm text-slate-600 mt-2">
                    Proper sorting reduces contamination and increases
                    recycling efficiency.
                  </p>
                </div>

                <div className="mt-3">
                  <Button
                    onClick={() => alert("Share not implemented")}
                  >
                    Share result
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-500">
                No result yet. Upload an image and press Analyze.
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto mt-8 text-xs text-slate-400">
        © {new Date().getFullYear()} AI Recycling — improve recycling
        one photo at a time.
      </footer>
    </div>
  );
}
