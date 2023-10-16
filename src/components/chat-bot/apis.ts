import { createParser } from "eventsource-parser";
import { ChatMessage } from "./types.js";
import { message } from "antd";
import { handleAuthError } from "@/utils/index.js";

interface GetChatMessageRequest {
  messages: ChatMessage[];
}

export type OnMessage = (event: string, data: any) => void;

export const getChatMessage = (
  params: GetChatMessageRequest,
  onMessage: OnMessage
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    handleAuthError()
    return;
  }

  fetch("/api/chatbot/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      messages: params.messages,
    }),
  }).then(async (response) => {
    if (!response.ok) throw new Error(response.statusText);
    if (!response.body) throw new Error("response body is null");

    const parser = createParser((event) => {
      if (event.type === "event") {
        const { event: eventName, data } = event;
        if (!eventName) throw new Error("event name is null");

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
  }).catch((error) => {
    message.error("AI机器人服务异常，请稍后重试", 2);
    console.log("sse error", error);
  })

};
