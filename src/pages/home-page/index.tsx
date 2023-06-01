import styles from "./index.module.scss";
import logo from "../../assets/terminal_white.svg";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
interface IProps {}

function HomePage({}: IProps) {
  const navigate = useNavigate();
  const descDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typed = new Typed(descDivRef.current, {
      strings: [
        "告别终端环境配置，浏览器环境开箱即用^600 <br />AI机器人为你解答一切关于Linux命令的疑问",
      ],
      typeSpeed: 50,
    });

    return () => typed.destroy();
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span>Terryminal</span>
          </div>
          <p className={styles.subtitle}>在线终端命令学习平台</p>
          <div>
            <span ref={descDivRef} className={styles.desc} />
          </div>
        </div>

        <div className={styles.login}>
          <Input className={styles.input} placeholder="请输入邮箱" />
          <Input className={styles.input} placeholder="请输入密码" />

          <div className={styles.btnGroup}>
            <Button
              onClick={() => navigate("/learn")}
              type="primary"
              size="large"
              shape="round"
            >
              登录
            </Button>
            <Button size="large" shape="round">
              注册
            </Button>
            <Button type="link">忘记密码？</Button>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.logoBg} />
        <img src={logo} className={styles.logo} alt="logo" />
      </div>
    </div>
  );
}

export default HomePage;
