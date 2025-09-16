import { Loader2 } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const LoadingState = ({ title, description }: Props) => {
  return (
    <div className="py-8 px-8 flex flex-1 items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center justify-center gap-y-8 bg-card border border-border rounded-xl p-12 shadow-lg max-w-md w-full backdrop-blur-sm">
        {/* Enhanced loader with subtle glow effect */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
          <div className="relative bg-muted rounded-full p-4">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        </div>

        {/* Content with improved typography hierarchy */}
        <div className="flex flex-col gap-y-3 text-center">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            {description}
          </p>
        </div>

        {/* Subtle progress indicator dots */}
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary/30 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
