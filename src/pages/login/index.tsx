import styles from "./index.module.scss";
import logo from "@/assets/terminal_white.svg";
import { useCallback, useEffect, useRef } from "react";
import Typed from "typed.js";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "./api";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

interface IProps {}

interface IFormValues {
  email: string;
  password: string;
}

function LoginPage({}: IProps) {
  const navigate = useNavigate();
  const descDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typed = new Typed(descDivRef.current, {
      strings: [
        "告别终端环境配置，浏览器环境开箱即用 ^200 <br />AI机器人为你解答一切关于Linux命令的疑问",
      ],
      typeSpeed: 50,
    });

    return () => typed.destroy();
  });

  const onFinish = useCallback(async (value: IFormValues) => {
    try {
      if (await login({ email: value.email, password: value.password })) {
        message.success("登录成功", 2);
        navigate("/dashboard");
      }
    } catch (err) {
      message.error("登录失败", 2);
    }
  }, []);

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
          <Form<IFormValues> onFinish={onFinish}>
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
              <Input prefix={<UserOutlined />} placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "密码不可为空" },
                { min: 6, message: "密码长度不少于6个字符" },
              ]}
              hasFeedback
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item className={styles.btnGroup}>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                shape="round"
              >
                登录
              </Button>
              <Button
                onClick={() => navigate("/register")}
                size="large"
                shape="round"
              >
                注册
              </Button>
              <Button type="link">忘记密码？</Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.logoBg} />
        <img src={logo} className={styles.logo} alt="logo" />
      </div>
    </div>
  );
}

export default LoginPage;
