'use client'

import { AssistantMessage, UserMessage } from '@/components/ai/messages/message';
import { GenericToolCall } from '@/components/ai/tools/tool-call';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ToolInvocation } from 'ai';
import { Message, useChat } from 'ai/react';
import { ArrowUp } from 'lucide-react';
import React from 'react';
import { ScrapeHackerNewsToolCall } from '../tools/scrape-hacker-news';


export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, setMessages } = useChat({
        api: '/api/chat',
        maxSteps: 5,
    });

    // Add ref for the messages container
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    // Scroll to bottom function
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e);
        setTimeout(() => scrollToBottom(), 200);
    };

    const groupedMessages = messages.reduce((acc: Message[][], message: Message) => {
        if (acc.length === 0 || message.role !== 'assistant' || acc[acc.length - 1][0].role !== 'assistant') {
            acc.push([message]);
        } else {
            acc[acc.length - 1].push(message);
        }
        return acc;
    }, []);

    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch gap-4 pb-40">
            {/* Add reset button at the top */}
            <div className="fixed top-0 right-0 left-0 flex justify-center items-center h-16 bg-white/20 dark:bg-neutral-900/80 backdrop-blur-sm z-10">
                <div className="w-full max-w-md flex justify-end px-4">
                    <Button
                        onClick={() => {
                            stop();
                            setMessages([]);
                        }}
                        variant='secondary'
                    >
                        Reset Chat
                    </Button>
                </div>
            </div>

            {groupedMessages.length === 0 ? (
                <div className="flex flex-col items-center gap-8 text-center p-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                            Welcome to Mistral AI!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Start a conversation or try one of these examples:
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        {[
                            "What are the top stories on Hacker News right now?",
                            "Can you help me understand how React hooks work?",
                            "What's the best way to learn TypeScript?",
                        ].map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    handleInputChange({
                                        target: { value: suggestion }
                                    } as React.ChangeEvent<HTMLTextAreaElement>);

                                    // Optional: focus the textarea after setting the value
                                    const textarea = document.querySelector('textarea');
                                    if (textarea) {
                                        textarea.focus();
                                    }
                                }}
                                className="p-4 text-left border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 
                                         border-gray-200 dark:border-gray-700 transition-colors duration-200
                                         text-gray-700 dark:text-gray-300"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                groupedMessages.map((group: Message[], index: number) => (
                    <div key={index} className="">
                        {group.map((message, messageIndex) => (
                            <div key={messageIndex}>
                                {message.role === 'assistant' &&
                                    <AssistantMessage
                                        content={message.content}
                                        isLoading={isLoading && index === groupedMessages.length - 1 &&
                                            messageIndex === group.length - 1}
                                    />}
                                {message.role === 'user' && <UserMessage content={message.content} />}
                                {message.toolInvocations?.map((toolInvocation: ToolInvocation) => {
                                    if (toolInvocation.toolName === 'scrape_hacker_news') {
                                        return (
                                            <div key={toolInvocation.toolCallId}>
                                                <ScrapeHackerNewsToolCall toolCall={toolInvocation} />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={toolInvocation.toolCallId}>
                                                <GenericToolCall toolCall={toolInvocation} />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        ))}
                    </div>
                ))
            )}

            {/* Add ref element at the bottom */}
            <div ref={messagesEndRef} />

            <div className='fixed bottom-0 right-0 left-0 flex justify-center items-center h-fit bg-white/20 dark:bg-neutral-900/80 backdrop-blur-sm'>
                <form onSubmit={submitMessage} className="w-full max-w-md relative mb-8">
                    <Textarea
                        className="resize-none w-full pr-24 overflow-hidden"
                        value={input}
                        placeholder="Send a message... press enter to send"
                        onChange={(e) => {
                            handleInputChange(e);
                            // Auto-grow logic
                            const textarea = e.target;
                            textarea.style.height = 'auto';
                            textarea.style.height = `${textarea.scrollHeight}px`;
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                const form = e.currentTarget.form;
                                if (form) form.requestSubmit();
                            }
                        }}
                        rows={1}
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        disabled={isLoading ? false : !input.trim()}
                        className={cn("absolute right-2 bottom-2 p-1 text-sm")}
                        onClick={(e) => {
                            if (isLoading) {
                                e.preventDefault();
                                stop();
                            }
                        }}
                        size='icon'
                    >
                        {isLoading ? <span className="size-3.5 bg-white rounded-sm"></span> : <ArrowUp className="size-5" />}
                    </Button>
                </form>
            </div>
        </div>
    );
}