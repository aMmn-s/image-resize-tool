import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ImageResizeTool } from "@/components/ImageResizeTool";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AdPlaceholder position="top" />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <h1 className="mb-6 text-lg font-medium text-foreground">画像リサイズ・形式変換</h1>
        <ImageResizeTool />
      </main>
      <AdPlaceholder position="bottom" />
    </div>
  );
}
