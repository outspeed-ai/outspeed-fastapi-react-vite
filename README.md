# Outspeed Sample App

A React web app that demonstrates real-time voice conversations using Outspeed's API.

## Requirements

- `python` and `uv` for server
- `node` and `npm` for client (React)
- Outspeed API key

## Setup

### 1. Environment Variables

Create a `.env` file in the `server` directory:

```bash
OUTSPEED_API_KEY=your_outspeed_api_key_here
```

### 2. Server Setup

Go to server directory:

```bash
cd server
```

Install dependencies:

```bash
uv sync
```

Run the server:

```bash
uv run fastapi dev server.py
```

The server will start on `http://127.0.0.1:8000`

### 3. Client Setup

Install dependencies:

```bash
npm install
```

> [!NOTE]
> This will install `@outspeed/client` and `@outspeed/react`.

Start the React app:

```bash
npm run dev
```

## Usage

1. Make sure the server is running on port 8000
2. Open the React app in your browser
3. Click "Start Session" to begin a voice conversation
4. Speak with the AI assistant (configured as a helpful but witty assistant with "sophie" voice)
5. Click "Stop Session" to end the conversation

The app uses semantic voice activity detection, which intelligently detects when you've finished speaking (vs. just pausing) to minimize interruptions. For example, it won't interrupt you when you say "uh" or pause briefly while thinking.
