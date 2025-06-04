import { type SessionConfig } from "@outspeed/client";
import { useConversation } from "@outspeed/react";
import { useState } from "react";

import Logo from "./assets/react.svg";

import "./App.css";

// make sure server is running and this origin is allowed in server.py
const SERVER_URL = "http://127.0.0.1:8000";

const getEphemeralKeyFromServer = async (config: SessionConfig) => {
  const tokenResponse = await fetch(`${SERVER_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });

  const data = await tokenResponse.json();
  if (!tokenResponse.ok) {
    throw new Error("Failed to get ephemeral key");
  }

  return data.client_secret.value;
};

const SYSTEM_PROMPT = `
You are a helpful but witty assistant for Outspeed.

Outspeed is a platform that allows you to build AI voice companions with emotions and memory.
Use Outspeed API to quickly deploy unlimited voice companions that scale with your users, only at $1/hr (includes LLM).

Website: https://outspeed.com
`;

const sessionConfig: SessionConfig = {
  model: "outspeed-v1",
  instructions: SYSTEM_PROMPT,
  voice: "sophie", // find more voices at https://dashboard.outspeed.com (this will be improved soon!)
  temperature: 0.5,
  turn_detection: {
    type: "semantic_vad",
  },
  first_message: "Hello, how can i assist you with Outspeed today?",
};

export default function App() {
  const [sessionCreated, setSessionCreated] = useState(false);

  const conversation = useConversation({
    sessionConfig: sessionConfig,
  });

  const startSession = async () => {
    try {
      const ephemeralKey = await getEphemeralKeyFromServer(sessionConfig);

      await conversation.startSession(ephemeralKey);

      // call after startSession to ensure the session is created
      conversation.on("session.created", (event) => {
        console.log("session.created", event);
        setSessionCreated(true);
      });

      // listen to all events from the server
      conversation.on("*", (event) => {
        console.log("event received from server", event);
      });

      setSessionCreated(true);
    } catch (error) {
      console.error("Error starting session", error);
    }
  };

  const endSession = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error("Error ending session", error);
    } finally {
      setSessionCreated(false);
    }
  };

  if (sessionCreated) {
    return (
      <>
        <img src={Logo} alt="Logo" className="logo" />
        <h2>Session created!</h2>
        <button onClick={endSession} className="mt-4">
          Stop Session
        </button>
      </>
    );
  }

  return (
    <>
      <img src={Logo} alt="Logo" className="logo" />
      <h2>Click the button to start a session</h2>
      <button onClick={startSession} className="mt-4">
        Start Session
      </button>
    </>
  );
}
