import { useCallback, useRef, useState } from "react";
import styles from "./index.module.scss";
import { ChatMessage, Role } from "./types.js";
import { getChatMessage } from "./apis";
import { marked } from "marked";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { InitMsg } from "./constants";
import robotIcon from "@/assets/robot.svg";
import { Button } from "antd";
import { ClearOutlined } from "@ant-design/icons";

interface IProps {}

function ChatBot({}: IProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([InitMsg]);

  /* 创建缓冲区用于存放sse流中的content，setMsgBuf存在异步更新问题，故采用msgBufRef获取最新数据 */
  const [msgBuf, setMsgBuf] = useState("");
  const msgBufRef = useRef("");
  const updateMsgBuf = useCallback((val: string) => {
    setMsgBuf(val);
    msgBufRef.current = val;
  }, []);

  const onSend = useCallback(async () => {
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
              updateMsgBuf(msgBufRef.current + data);
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

  const onNewChat = useCallback(() => {
    setMessages([]);
    setInputValue("");
    updateMsgBuf("");
  }, []);

  return (
    <>
      <div
        style={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <MainContainer responsive style={{ fontSize: "1em" }}>
          <ChatContainer>
            <ConversationHeader>
              <Avatar src={robotIcon} name="Terry" />
              <ConversationHeader.Content userName="Terry" />
              <ConversationHeader.Actions>
                <Button icon={<ClearOutlined />} onClick={onNewChat}>
                  清空对话
                </Button>
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              typingIndicator={
                msgBuf && <TypingIndicator content="Terry正在发送消息" />
              }
            >
              <MessageSeparator content={new Date().toDateString()} />
              {messages.map((message, index) => (
                <Message
                  key={index}
                  model={{
                    sender: message.role,
                    direction:
                      message.role === Role.USER ? "outgoing" : "incoming",
                    position: "single",
                  }}
                >
                  <Message.HtmlContent
                    className={styles.msgContent}
                    html={marked.parse(message.content)}
                  />
                </Message>
              ))}

              {msgBuf && (
                <Message
                  model={{
                    sender: Role.ASSISTANT,
                    direction: "incoming",
                    position: "single",
                  }}
                >
                  <Message.HtmlContent
                    className={styles.msgContent}
                    html={marked.parse(msgBuf)}
                  />
                </Message>
              )}
            </MessageList>

            <MessageInput
              value={inputValue}
              onChange={(_, text) => setInputValue(text)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSend();
              }}
              onSend={onSend}
              attachButton={false}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
}

export default ChatBot;
