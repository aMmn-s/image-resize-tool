export function AdPlaceholder({ position = "top" }: { position?: "top" | "bottom" }) {
  return (
    <div
      className={`flex h-20 w-full shrink-0 items-center justify-center border-border bg-muted/30 text-muted-foreground text-sm ${position === "top" ? "border-b" : "border-t"}`}
    >
      広告掲載スペース
    </div>
  );
}
