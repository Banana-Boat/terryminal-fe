import ChatBot from "@/components/chat-bot";
import Terminal from "@/components/terminal";

interface IProps {}

function LearnPage({}: IProps) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "60%",
          padding: 10,
        }}
      >
        <Terminal ptyID="xtg1" />
        <Terminal ptyID="xtg2" />
      </div>
      <div style={{ width: "40%", margin: 10, overflow: "scroll" }}>
        <ChatBot />
      </div>
    </>
  );
}

export default LearnPage;
