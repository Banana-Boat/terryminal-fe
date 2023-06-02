import styles from "./index.module.scss";
import logo from "../../assets/terminal_white.svg";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
interface IProps {}

function RegisterPage({}: IProps) {
  const navigate = useNavigate();
  const descDivRef = useRef<HTMLDivElement>(null);
  const [isAnimCompleted, setIsAnimCompleted] = useState(false);

  useEffect(() => {
    const typed = new Typed(descDivRef.current, {
      strings: ["Welcome to Terryminal! ^400 <br />Let’s begin the adventure!"],
      typeSpeed: 30,
      cursorChar: "_",
      onComplete: () => {
        setIsAnimCompleted(true);
      },
    });

    return () => typed.destroy();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <div className={styles.btnGroup}>
            <div className={styles.close} />
            <div className={styles.min} />
            <div className={styles.zoom} />
          </div>
          <span className={styles.title}>NewUser@Terryminal:~/register</span>
          <div />
        </div>
        <div className={styles.content}>
          <div>
            <span ref={descDivRef} className={styles.desc} />
          </div>

          {isAnimCompleted && (
            <div className={styles.form}>
              <div className={styles.input}>
                <span className={styles.prop}>Enter your email*: </span>
                <Input
                  size="large"
                  prefix={<ArrowRightOutlined />}
                  bordered={false}
                />
              </div>
              <div className={styles.input}>
                <span className={styles.prop}>Enter your password*: </span>
                <Input.Password
                  size="large"
                  prefix={<ArrowRightOutlined />}
                  bordered={false}
                />
              </div>
              <div className={styles.input}>
                <span className={styles.prop}>Enter your nickname: </span>
                <Input
                  size="large"
                  prefix={<ArrowRightOutlined />}
                  bordered={false}
                />
              </div>

              <Button
                onClick={() => navigate("/learn")}
                className={styles.registerBtn}
                type="primary"
                shape="round"
              >
                注册
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* <div className={styles.formContainer}>
        <div className={styles.header}></div>
      </div> */}
    </div>
  );
}

export default RegisterPage;
