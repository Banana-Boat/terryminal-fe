import { useCallback, useRef, useState } from "react";
import styles from "./index.module.scss";
import { ChatMessage, Role } from "./types.js";
import { getChatMessage } from "./apis";

interface IProps {}

function ChatBot({}: IProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  /* 创建缓冲区用于存放sse流中的content，setMsgBuf存在异步更新问题，故采用msgBufRef获取最新数据 */
  const [msgBuf, setMsgBuf] = useState("");
  const msgBufRef = useRef("");
  const updateMsgBuf = useCallback((val: string) => {
    setMsgBuf(val);
    msgBufRef.current = val;
  }, []);

  const sendBtnHandle = useCallback(async () => {
    if (!inputValue) return;

    const userMessage = { role: Role.USER, content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      getChatMessage(
        { messages: [...messages, userMessage] },
        (event, data) => {
          switch (event) {
            case "message":
              const dataJSON = JSON.parse(data);
              if (!dataJSON.content) return;
              updateMsgBuf(msgBufRef.current + dataJSON.content);
              break;

            case "end":
              const msg = {
                role: Role.ASSISTANT,
                content: msgBufRef.current,
              };
              setMessages((prev) => {
                return [...prev, msg];
              });
              updateMsgBuf("");
              break;

            case "error":
              console.log("sse error", data);
              updateMsgBuf("");
              break;
          }
        }
      );
    } catch (err) {
      console.log("sse error", err);
    }
  }, [inputValue, messages]);

  const newChatBtnHandle = useCallback(() => {
    setMessages([]);
    setInputValue("");
    updateMsgBuf("");
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={sendBtnHandle}>发送</button>
        <button onClick={newChatBtnHandle}>新建对话</button>
      </div>

      <div>
        {messages.map((message, index) => (
          <p key={index} className={styles.message}>
            <strong>{message.role}: </strong>
            <span>{message.content}</span>
          </p>
        ))}

        <p>{msgBuf}</p>
      </div>
    </>
  );
}

export default ChatBot;
