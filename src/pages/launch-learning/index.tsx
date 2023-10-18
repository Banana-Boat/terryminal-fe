import { useTermStore } from "@/stores/term";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import styles from "./index.module.scss";
import LaunchConfigModal from "./components/launch-config-modal";
import { useCallback, useState } from "react";
import { IFormValues as ILaunchConfigModalFormValues } from "./components/launch-config-modal";
import useTermSocketStore from "@/stores/term-socket";
import { useNavigate } from "react-router-dom";

interface IProps {}

function LaunchLearningPage({}: IProps) {
  const { terms, updateLaunchedTerms } = useTermStore();
  const { termSocket } = useTermSocketStore();
  const navigate = useNavigate();

  /* Launch Panel相关 */
  const [isShowLaunchConfigModal, setIsShowLaunchConfigModal] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const onLaunch = useCallback(
    async (value: ILaunchConfigModalFormValues) => {
      setIsShowLaunchConfigModal(false);
      setIsLaunching(true);
      if (await termSocket.open()) {
        updateLaunchedTerms(value.termsToLaunch);
        value.termsToLaunch.forEach((termId) => {
          termSocket.start(termId);
        });
        navigate("/learn");
      } else {
        message.error("终端连接失败，请稍后再试", 2);
      }
      setIsLaunching(false);
    },
    [termSocket, updateLaunchedTerms]
  );

  return (
    <div className={styles.launchPanel}>
      <Button
        onClick={() => {
          if (terms.length === 0) {
            message.warning("请先创建终端实例", 2);
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

export default LaunchLearningPage;
