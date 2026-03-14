"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ACCEPT = "image/jpeg,image/png,image/webp";
const FORMATS = [
  { value: "image/jpeg", label: "JPG" },
  { value: "image/png", label: "PNG" },
  { value: "image/webp", label: "WebP" },
] as const;

export function ImageResizeTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/png");
  const [width, setWidth] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const revokePreview = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);

  const handleFile = useCallback(
    (f: File | null) => {
      revokePreview();
      setFile(f);
      if (f) setPreviewUrl(URL.createObjectURL(f));
      else setPreviewUrl(null);
    },
    [revokePreview]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f && f.type.match(/^image\/(jpeg|png|webp)$/)) handleFile(f);
    },
    [handleFile]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const processAndDownload = useCallback(() => {
    if (!file || !previewUrl) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const w = width ? Math.max(1, parseInt(width, 10) | 0) : img.naturalWidth;
      const scale = w / img.naturalWidth;
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const ext = format === "image/jpeg" ? "jpg" : format === "image/png" ? "png" : "webp";
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = `image.${ext}`;
          a.click();
          URL.revokeObjectURL(a.href);
        },
        format,
        0.92
      );
    };
    img.src = previewUrl;
  }, [file, previewUrl, width, format]);

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-4 space-y-4">
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          onChange={onInputChange}
          className="hidden"
          aria-label="画像を選択"
        />
        <div
          role="button"
          tabIndex={0}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center text-sm text-muted-foreground cursor-pointer ${dragging ? "border-primary bg-muted/50" : "border-border"}`}
        >
          {previewUrl ? (
            <span>画像を選択済み（クリックで差し替え）</span>
          ) : (
            <span>画像をドラッグ＆ドロップ、またはクリックして選択</span>
          )}
        </div>

        <div className="space-y-2">
          <Label>変換形式</Label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as "image/jpeg" | "image/png" | "image/webp")}
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            {FORMATS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>横幅（px）</Label>
          <Input
            type="number"
            min={1}
            placeholder="指定なしの場合は元の幅"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>

        <Button
          className="w-full"
          onClick={processAndDownload}
          disabled={!file || !previewUrl}
        >
          変換してダウンロード
        </Button>
      </CardContent>
    </Card>
  );
}
