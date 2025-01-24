import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ToolInvocation } from "ai";
import { Check } from "lucide-react";
import { createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

// Context
const ToolCallContext = createContext<{ loading?: boolean }>({});

// Root Component
interface ToolCallRootProps {
    loading?: boolean;
    active?: boolean;
    onClick?: () => void;
    children: ReactNode;
}

function ToolCallRoot({ loading = false, active, onClick, children }: ToolCallRootProps) {
    return (
        <ToolCallContext.Provider value={{ loading }}>
            <Card
                className={cn(
                    "w-full max-w-md group flex p-1.5 rounded-xl mt-1 gap-2 mb-2",
                    active && "border-gray-400/70 outline-none ring-[3px] ring-ring/10",
                    onClick && "cursor-pointer hover:border-gray-400/70"
                )}
                onClick={onClick}
            >
                {children}
            </Card>
        </ToolCallContext.Provider>
    );
}

// Icon Component
function ToolCallIcon() {
    const { loading } = useContext(ToolCallContext);
    return (
        <div className="size-12 rounded-[8px] bg-muted flex items-center justify-center border overflow-hidden">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="animate-spin rounded-full h-6 w-6 border-2 border-gray-900/20 border-t-gray-900/60"
                    />
                ) : (
                    <motion.div
                        key="check"
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                        <Check className="size-6 text-green-600" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Content Component
interface ToolCallContentProps {
    title: string;
    description?: string;
}

function ToolCallContent({ title, description }: ToolCallContentProps) {
    const { loading } = useContext(ToolCallContext);
    return (
        <div className="flex flex-col justify-between pb-0.5">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loading-title"
                        initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                        <AnimatedShinyText className="flex items-center">
                            <h3 className="text-md font-medium">{title}</h3>
                        </AnimatedShinyText>
                    </motion.div>
                ) : (
                    <motion.div
                        key="static-title"
                        initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="flex items-center"
                    >
                        <h3 className="text-md font-medium">{title}</h3>
                    </motion.div>
                )}
            </AnimatePresence>
            {description && (
                <motion.div
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.1,
                        delay: 0.1,
                        ease: "easeOut"
                    }}
                    className="text-sm text-muted-foreground"
                >
                    {description}
                </motion.div>
            )}
        </div>
    );
}

// Export as namespace
export const ToolCall = {
    Root: ToolCallRoot,
    Icon: ToolCallIcon,
    Content: ToolCallContent,
};

// Helper component for backward compatibility
export function GenericToolCall({ toolCall }: { toolCall: ToolInvocation }) {
    const getProps = () => {
        switch (toolCall.state) {
            case "partial-call":
                return { loading: true, title: `Writing tool ${toolCall.toolName}` };
            case "call":
                return { loading: true, title: `Calling tool ${toolCall.toolName}` };
            case "result":
                return { loading: false, title: `Tool ${toolCall.toolName} completed` };
        }
    };

    const props = getProps();
    return (
        <ToolCall.Root loading={props.loading}>
            <ToolCall.Icon />
            <ToolCall.Content title={props.title} description="This is a description" />
        </ToolCall.Root>
    );
}