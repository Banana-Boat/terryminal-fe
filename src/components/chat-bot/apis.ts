import { createParser } from "eventsource-parser";
import { ChatMessage } from "./types.js";

interface GetChatMessageRequest {
  messages: ChatMessage[];
}

export type OnMessage = (event: string, data: any) => void;

export const getChatMessage = async (
  params: GetChatMessageRequest,
  onMessage: OnMessage
) => {
  const response = await fetch("/api/chatbot/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: params.messages,
    }),
  });

  if (!response.body) return;

  const parser = createParser((event) => {
    if (event.type === "event") {
      const { event: eventName, data } = event;
      if (!eventName) return;

      onMessage(eventName, data);
    }
  });

  async function* iterableStreamAsync(
    stream: ReadableStream
  ): AsyncIterableIterator<Uint8Array> {
    const reader = stream.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          return;
        } else {
          yield value;
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  for await (const chunk of iterableStreamAsync(response.body)) {
    const _chunk = new TextDecoder().decode(chunk);
    parser.feed(_chunk);
  }
};
