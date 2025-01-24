# Mistral AI Chat Application

A Next.js application that uses Mistral AI's large language model to provide an interactive chat experience.

## Prerequisites

- Node.js 18+ installed
- pnpm package manager (recommended)
- Mistral API key ([Get it here](https://console.mistral.ai/))

## Setup

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following content:

```bash
MISTRAL_API_KEY=your_api_key_here
```

## Development

Run the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Features

- Chat interface using Mistral's large language model
- Real-time Hacker News integration

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS
- Vercel AI SDK
