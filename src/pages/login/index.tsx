import styles from "./index.module.scss";
import logo from "@/assets/terminal_white.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login, updatePwd } from "./api";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import ForgetPwdModal from "./components/forget-pwd-modal";
import { IFormValues as IForgetPwdModalFormValues } from "./components/forget-pwd-modal";

interface IProps {}

interface IFormValues {
  email: string;
  password: string;
}

function LoginPage({}: IProps) {
  const navigate = useNavigate();

  /* 打字动效 */
  const descDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const typed = new Typed(descDivRef.current, {
      strings: [
        "告别终端环境配置，浏览器环境开箱即用 ^200 <br />AI机器人为你解答一切关于Linux命令的疑问",
      ],
      typeSpeed: 50,
    });

    return () => typed.destroy();
  }, []);

  /* 表单提交 */
  const onFinish = useCallback(async (value: IFormValues) => {
    if (await login({ ...value })) {
      message.success("登录成功", 2);
      navigate("/dashboard");
    }
  }, []);

  /* 忘记密码相关 */
  const [isShowForgetPwdModal, setIsShowForgetPwdModal] = useState(false);
  const onForgetPwdModalSubmit = useCallback(
    async (value: IForgetPwdModalFormValues) => {
      if (await updatePwd(value)) {
        message.success("密码修改成功", 2);
        setIsShowForgetPwdModal(false);
      }
    },
    []
  );

  return (
    <>
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
                <Button
                  onClick={() => setIsShowForgetPwdModal(true)}
                  type="link"
                >
                  忘记密码？
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.logoBg} />
          <img src={logo} className={styles.logo} alt="logo" />
        </div>
      </div>

      <ForgetPwdModal
        isShow={isShowForgetPwdModal}
        onCancel={() => setIsShowForgetPwdModal(false)}
        onSubmit={onForgetPwdModalSubmit}
      />
    </>
  );
}

export default LoginPage;
