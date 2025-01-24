'use client'

import { Hammer2 } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ToolInvocation } from "ai";
import { Loader2 } from "lucide-react";

export function ScrapeHackerNewsToolCall({ toolCall }: { toolCall: ToolInvocation }) {
    const getProps = () => {
        switch (toolCall.state) {
            case "partial-call":
                return {
                    loading: true,
                    title: "Preparing to fetch Hacker News stories",
                    description: "Preparing to fetch stories"
                };
            case "call":
                return {
                    loading: true,
                    title: "Fetching Hacker News stories",
                    description: "Fetching latest stories"
                };
            case "result":
                return {
                    loading: false,
                    title: "Hacker News stories retrieved",
                    description: "Fetched and processed the latest stories"
                };
        }
    };

    const props = getProps();

    return (
        <div
            className={cn(
                "text-zinc-400 whitespace-pre-wrap relative mb-2.5",
            )}
        >
            {props.loading ? <Loader2 className="absolute text-zinc-300 top-1.5 -left-6 size-3.5 animate-spin" /> : <Hammer2 className="size-3.5 text-zinc-300 absolute top-1.5 -left-6" />}
            {props.title}
        </div>
    );
}
