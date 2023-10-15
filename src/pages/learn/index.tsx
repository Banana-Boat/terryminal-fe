import ChatBot from "@/components/chat-bot";
import Terminal from "@/components/terminal";
import { useTermStore } from "@/stores/term";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import styles from "./index.module.scss";
import LaunchConfigModal from "./components/launch-config-modal";
import { useCallback, useState } from "react";
import { IFormValues as ILaunchConfigModalFormValues } from "./components/launch-config-modal";
import { TermPanelMode } from "./types";
import useTermSocketStore from "@/stores/term-socket";

interface IProps {}

function LearnPage({}: IProps) {
  const { terms, launchedTerms, updateLaunchedTerms } = useTermStore();
  const { termSocket } = useTermSocketStore();

  /* Terminal Panel相关 */
  const [termPanelMode, setTermPanelMode] = useState(TermPanelMode.SINGLE);
  const onStop = useCallback(() => {
    launchedTerms.forEach((termId) => {
      termSocket.end(termId);
    });
    termSocket.close();
    updateLaunchedTerms([]);
  }, [launchedTerms, termSocket, updateLaunchedTerms]);

  /* Launch Panel相关 */
  const [isShowLaunchConfigModal, setIsShowLaunchConfigModal] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const onLaunch = useCallback(
    async (value: ILaunchConfigModalFormValues) => {
      setIsShowLaunchConfigModal(false);
      setIsLaunching(true);
      if (await termSocket.open()) {
        setTermPanelMode(value.mode);
        updateLaunchedTerms(value.termsToLaunch);
        value.termsToLaunch.forEach((termId) => {
          termSocket.start(termId);
        });
      } else {
        message.error("终端连接失败，请稍后再试");
      }
      setIsLaunching(false);
    },
    [termSocket, updateLaunchedTerms]
  );

  return launchedTerms.length !== 0 ? (
    <>
      <div className={styles.termBox}>
        {launchedTerms.map((termId) => (
          <Terminal key={termId} ptyID={termId} />
        ))}
        <Button
          onClick={onStop}
          style={{ width: "30%", margin: "0 auto" }}
          type="primary"
          shape="round"
          icon={<PauseCircleOutlined />}
        >
          停止 Stop
        </Button>
      </div>
      <div className={styles.chatBox}>
        <ChatBot />
      </div>
    </>
  ) : (
    <div className={styles.launchPanel}>
      <Button
        onClick={() => {
          if (terms.length === 0) {
            message.warning("请先创建终端实例");
            return;
          }
          setIsShowLaunchConfigModal(true);
        }}
        loading={isLaunching}
        className={styles.launchBtn}
        type="primary"
        shape="round"
        icon={<PlayCircleOutlined />}
        size="large"
      >
        启动 Launch
      </Button>

      <LaunchConfigModal
        isShow={isShowLaunchConfigModal}
        onLaunch={onLaunch}
        onCancel={() => setIsShowLaunchConfigModal(false)}
      />
    </div>
  );
}

export default LearnPage;
