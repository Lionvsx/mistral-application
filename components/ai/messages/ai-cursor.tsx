import { cn } from "@/lib/utils";

export function AICursor({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                "inline-block h-[1.3em] w-[0.5em] animate-[pulse_1s_steps(1)_infinite] rounded-[2px]",
                "bg-foreground/80 align-middle ml-[3px]",
                className
            )}
        />
    );
}
