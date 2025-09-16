import { AlertCircle } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="py-8 px-8 flex flex-1 items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center justify-center gap-y-8 bg-card border border-border rounded-xl p-12 shadow-lg max-w-md w-full backdrop-blur-sm">
        {/* Enhanced error icon with subtle glow effect */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-destructive/20 blur-xl animate-pulse"></div>
          <div className="relative bg-destructive/10 border border-destructive/20 rounded-full p-4">
            <AlertCircle className="size-8 text-destructive" />
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

        {/* Error-specific visual indicator */}
        <div className="flex items-center gap-2 px-4 py-2 bg-destructive/5 border border-destructive/10 rounded-lg">
          <div className="w-2 h-2 bg-destructive rounded-full"></div>
          <span className="text-xs text-destructive font-medium">
            Error occurred
          </span>
          <div className="w-2 h-2 bg-destructive/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
