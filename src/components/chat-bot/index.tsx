import { useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { ChatMessage, Role } from "./types.js";
import { createParser } from "eventsource-parser";

interface IProps {}

const controller = new AbortController();

function ChatBot({}: IProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendBtnHandle = useCallback(async () => {
    if (!inputValue) return;

    const message = { role: Role.USER, content: inputValue };

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, message],
        }),
        signal: controller.signal,
      });

      if (!response.body) return;

      const parser = createParser((event) => {
        if (event.type === "event") {
          const { event: eventName, data } = event;

          console.log("@@", eventName, data);
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
        const str = new TextDecoder().decode(chunk);
        parser.feed(str);
      }
    } catch (error) {
      console.log(error);
    }
  }, [inputValue]);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={sendBtnHandle}>发送</button>
    </>
  );
}

export default ChatBot;
