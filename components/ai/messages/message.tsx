"use client";

import { Markdown } from "@/components/ai/messages/markdown";
import { ReturnIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { LoadingProvider } from "./loading-context";

export function UserMessage({
    content,
    className,
}: {
    content: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "text-zinc-500 whitespace-pre-wrap relative",
                className
            )}
        >
            <ReturnIcon className="absolute text-zinc-400 top-1.5 -left-6 size-3.5" />
            {content}
        </div>
    );
}

export function AssistantMessage({
    content,
    isLoading = false
}: {
    content: string;
    isLoading?: boolean;
}) {
    return (
        <LoadingProvider isLoading={isLoading}>
            <div className="flex flex-col gap-2 relative">
                <div className="flex items-start">
                    <Markdown>{content}</Markdown>
                </div>
            </div>
        </LoadingProvider>
    );
}
