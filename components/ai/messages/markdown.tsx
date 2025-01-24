/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AICursor } from "@/components/ai/messages/ai-cursor";
import { useLoading } from "@/components/ai/messages/loading-context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { memo, ReactNode } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const NonMemoizedMarkdown = ({
    children,
}: {
    children: string;
}) => {
    const { isLoading } = useLoading();

    const isLastTextNode = (node: any): boolean => {
        if (!isLoading) return false;

        // Get this node's text content
        const nodeText = (typeof node === 'string' ? node : node?.value || '').trim();
        if (!nodeText) return false;

        // Get all text content from the markdown
        const allText = children.trim();

        // Check if this node's text appears at the end AND is a complete match
        const isLastTextNode = allText.endsWith(nodeText) && nodeText.length > 1;

        return isLastTextNode;
    };

    const renderNode = (content: ReactNode) => {
        if (typeof content === 'string') {
            return (
                <>
                    {content}
                    {isLoading && isLastTextNode(content) && <AICursor />}
                </>
            );
        }

        if (Array.isArray(content)) {
            return content.map((item, index) => (
                <React.Fragment key={index}>
                    {renderNode(item)}
                </React.Fragment>
            ));
        }

        return content;
    };

    const components: Components = {
        code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            if (!inline && match) {
                return (
                    <pre
                        className={cn(
                            "text-sm w-[80dvw] md:max-w-[500px] overflow-x-scroll",
                            className
                        )}
                        {...props}
                    >
                        <code className={match[1]}>
                            {renderNode(children)}
                        </code>
                    </pre>
                );
            }
            return (
                <code
                    className={`${className} text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
                    {...props}
                >
                    {children}
                </code>
            );
        },
        ol: ({ node, children, ...props }) => {
            return (
                <ol className="list-decimal list-outside ml-8 my-0 h-fit" {...props}>
                    {children}
                </ol>
            );
        },
        li: ({ node, children, ...props }) => {
            return (
                <li className="py-1" {...props}>
                    {renderNode(children)}
                </li>
            );
        },
        ul: ({ node, children, ...props }) => {
            return (
                <ul className="list-decimal list-outside ml-8" {...props}>
                    {children}
                </ul>
            );
        },
        strong: ({ node, children, ...props }) => {
            return (
                <span className="font-semibold" {...props}>
                    {renderNode(children)}
                </span>
            );
        },
        em: ({ node, children, ...props }) => {
            return (
                <em {...props}>
                    {renderNode(children)}
                </em>
            );
        },
        a: ({ node, children, ...props }) => {
            return (
                // @ts-expect-error Link href
                <Link
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                    {...props}
                >
                    {renderNode(children)}
                </Link>
            );
        },
        p: ({ node, children, ...props }) => {
            return (
                <p className="leading-relaxed mb-1" {...props}>
                    {renderNode(children)}
                </p>
            );
        },
        br: () => <br />,
        table: ({ node, children, ...props }) => {
            return (
                <div className="overflow-x-auto my-4">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props}>
                        {children}
                    </table>
                </div>
            );
        },
        thead: ({ node, children, ...props }) => {
            return (
                <thead className="" {...props}>
                    {children}
                </thead>
            );
        },
        tbody: ({ node, children, ...props }) => {
            return (
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props}>
                    {renderNode(children)}
                </tbody>
            );
        },
        tr: ({ node, children, ...props }) => {
            return (
                <tr className="" {...props}>
                    {children}
                </tr>
            );
        },
        th: ({ node, children, ...props }) => {
            return (
                <th
                    className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    {...props}
                >
                    {renderNode(children)}
                </th>
            );
        },
        td: ({ node, children, ...props }) => {
            return (
                <td
                    className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                    {...props}
                >
                    {renderNode(children)}
                </td>
            );
        },
    };

    return (
        <div className="relative inline-block">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components}
                className="inline prose-headings:text-lg prose-headings:font-semibold"
            >
                {children}
            </ReactMarkdown>
        </div>
    );
};

export const Markdown = memo(
    NonMemoizedMarkdown,
    (prevProps, nextProps) => prevProps.children === nextProps.children
);
