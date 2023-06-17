import styles from "./index.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import MacWindow from "@/components/mac-window";
import { register } from "./api";

interface IProps {}

interface IFormValues {
  email: string;
  password: string;
  repassword: string;
  nickname: string;
}

function RegisterPage({}: IProps) {
  const navigate = useNavigate();
  const descDivRef = useRef<HTMLDivElement>(null);
  const [isAnimCompleted, setIsAnimCompleted] = useState(false);

  useEffect(() => {
    const typed = new Typed(descDivRef.current, {
      strings: ["Welcome to Terryminal! ^200 <br />Let’s begin the adventure!"],
      typeSpeed: 30,
      cursorChar: "_",
      onComplete: () => {
        setIsAnimCompleted(true);
      },
    });

    return () => typed.destroy();
  }, []);

  const onFinish = useCallback(async (value: IFormValues) => {
    try {
      if (
        await register({
          email: value.email,
          password: value.password,
          nickname: value.nickname,
        })
      ) {
        message.success("注册成功", 2);
        navigate("/login");
      }
    } catch (err) {
      message.error("注册失败", 2);
    }
  }, []);

  return (
    <div className={styles.container}>
      <MacWindow
        title="NewUser@Terryminal:~/register"
        style={{
          width: "45%",
          height: "60%",
          minWidth: "600px",
          minHeight: "530px",
        }}
      >
        <div>
          <span ref={descDivRef} className={styles.desc} />
        </div>

        {isAnimCompleted && (
          <Form<IFormValues> className={styles.form} onFinish={onFinish}>
            <span className={styles.prop}>Enter your email*: </span>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "邮箱不可为空" },
                {
                  max: 50,
                  pattern: new RegExp(
                    "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
                  ),
                  message: "邮箱格式不正确",
                },
              ]}
              hasFeedback
            >
              <Input
                size="large"
                prefix={<ArrowRightOutlined />}
                bordered={false}
              />
            </Form.Item>

            <span className={styles.prop}>Enter your password*: </span>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "密码不可为空" },
                { min: 6, message: "密码长度不少于6个字符" },
                { max: 20, message: "密码长度过长" },
              ]}
              hasFeedback
            >
              <Input.Password
                size="large"
                prefix={<ArrowRightOutlined />}
                bordered={false}
              />
            </Form.Item>

            <span className={styles.prop}>Repeat your password*: </span>
            <Form.Item
              name="repassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "密码不可为空" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次输入的密码不一致"));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                size="large"
                prefix={<ArrowRightOutlined />}
                bordered={false}
              />
            </Form.Item>

            <span className={styles.prop}>Enter your nickname: </span>
            <Form.Item
              name="nickname"
              rules={[
                { required: true, message: "昵称不可为空" },
                { max: 10, message: "昵称过长" },
              ]}
              hasFeedback
            >
              <Input
                size="large"
                prefix={<ArrowRightOutlined />}
                bordered={false}
              />
            </Form.Item>

            <Form.Item className={styles.registerBtn}>
              <Button htmlType="submit" type="primary" shape="round">
                注册
              </Button>
            </Form.Item>
          </Form>
        )}
      </MacWindow>
    </div>
  );
}

export default RegisterPage;
