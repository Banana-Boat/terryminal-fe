import ChatBot from "@/components/chat-bot";
import Terminal from "@/components/terminal";
import { useTermStore } from "@/stores/term";
import { PauseCircleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import styles from "./index.module.scss";
import { useCallback, useState } from "react";
import useTermSocketStore from "@/stores/term-socket";
import MacWindow from "@/components/mac-window";
import { userStore } from "@/stores/user";
import { useNavigate } from "react-router-dom";

interface IProps {}

function LearnPage({}: IProps) {
  const { launchedTerms, updateLaunchedTerms } = useTermStore();
  const { termSocket } = useTermSocketStore();
  const { nickname } = userStore.getState();
  const navigate = useNavigate();

  /* Terminal Panel相关 */
  const [isStopping, setIsStopping] = useState(false);
  const onStop = useCallback(() => {
    launchedTerms.forEach((termId) => {
      termSocket.end(termId);
    });
    termSocket.close();
    setIsStopping(true);
    setTimeout(() => {
      updateLaunchedTerms([]);
      setIsStopping(false);
      message.success("终端实例已停止", 2);
      navigate("/dashboard");
    }, 4000);
  }, [launchedTerms, termSocket, updateLaunchedTerms]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <div className={styles.termBox}>
        <div className={styles.termBoxInner}>
          {launchedTerms.map((termId) => (
            <MacWindow
              key={termId}
              title={`${nickname}@Terryminal:~/learn`}
              contentBgColor="#202B33"
            >
              <Terminal
                ptyID={termId}
                rows={Math.floor(
                  (window.innerHeight - 280) / 18 / launchedTerms.length
                )}
                cols={Math.floor((window.innerWidth * 0.6 - 100) / 9)}
              />
            </MacWindow>
          ))}
        </div>
        <Button
          onClick={onStop}
          loading={isStopping}
          style={{ width: "30%", margin: "0 auto" }}
          shape="round"
          icon={<PauseCircleOutlined />}
        >
          停止 Stop
        </Button>
      </div>
      <div className={styles.chatBox}>
        <ChatBot />
      </div>
    </div>
  );
}

export default LearnPage;
