import { mistral } from "@ai-sdk/mistral";
import { createDataStreamResponse, smoothStream, streamText, tool } from "ai";
import { z } from "zod";

// Track multi-step operations
type ProgressStep = {
  toolCallId: string;
  step: number;
  totalSteps: number;
  description: string;
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Track active progress steps
  const activeSteps = new Map<string, ProgressStep>();

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: mistral("mistral-large-latest"),
        messages,
        system:
          "You are a helpful AI assistant that can fetch and analyze the latest news from Hacker News. When asked about news or tech updates, you can use the scrape_hacker_news tool to fetch real-time information. Present the information in a clear, organized manner and provide insights about the trending topics when relevant.",
        experimental_toolCallStreaming: true,
        abortSignal: req.signal,
        experimental_transform: smoothStream(),
        tools: {
          scrape_hacker_news: tool({
            description: "Fetch latest news from Hacker News",
            parameters: z.object({
              limit: z.number().optional().default(10),
            }),
            execute: async ({ limit }, { toolCallId }) => {
              const totalSteps = 2;

              activeSteps.set(toolCallId, {
                toolCallId,
                step: 0,
                totalSteps,
                description: "Fetching Hacker News stories",
              });

              try {
                // Step 1: Fetch top stories
                activeSteps.set(toolCallId, {
                  toolCallId,
                  step: 1,
                  totalSteps,
                  description: "Fetching top story IDs",
                });

                const response = await fetch(
                  "https://hacker-news.firebaseio.com/v0/topstories.json"
                );
                const storyIds = await response.json();

                // Step 2: Fetch story details
                activeSteps.set(toolCallId, {
                  toolCallId,
                  step: 2,
                  totalSteps,
                  description: "Fetching story details",
                });

                const stories = await Promise.all(
                  storyIds.slice(0, limit).map(async (id: number) => {
                    const storyResponse = await fetch(
                      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
                    );
                    return storyResponse.json();
                  })
                );

                activeSteps.delete(toolCallId);

                return {
                  success: true,
                  stories: stories.map((story) => ({
                    title: story.title,
                    url: story.url,
                    score: story.score,
                    author: story.by,
                  })),
                };
              } catch (err) {
                activeSteps.delete(toolCallId);
                console.error(err);
                return {
                  success: false,
                  error: "Failed to fetch Hacker News stories",
                };
              }
            },
          }),
        },
        maxSteps: 5,
      });

      result.mergeIntoDataStream(dataStream);
    },
  });
}
