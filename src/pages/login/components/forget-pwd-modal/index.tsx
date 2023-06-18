import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { useCallback, useState } from "react";
import { sendCodeByEmail } from "./api";

interface IProps {
  isShow: boolean;
  onSubmit: (value: IFormValues) => void;
  onCancel: () => void;
}

interface IFormValues {
  email: string;
  password: string;
  code: string;
}

function ForgetPwdModal({ isShow, onCancel, onSubmit }: IProps) {
  const form = Form.useForm<IFormValues>()[0];

  /* 验证码相关 */
  const [isSendCodeBtnDisabled, setIsSendCodeBtnDisabled] = useState(false);
  const [sendCodeBtnSecond, setSendCodeBtnSecond] = useState(60);
  const onSendCode = useCallback(async () => {
    if (!form.getFieldValue("email")) {
      message.error("请先填写邮箱", 2);
      return;
    }

    if (await sendCodeByEmail(form.getFieldValue("email"))) {
      message.success("验证码发送成功", 2);
      setIsSendCodeBtnDisabled(true);
      const timer = setInterval(() => {
        setSendCodeBtnSecond((prev) => {
          if (prev === 0) {
            clearInterval(timer);
            setIsSendCodeBtnDisabled(false);
            return 60;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }
  }, [form]);

  return (
    <Modal
      open={isShow}
      onCancel={onCancel}
      onOk={() => {
        onSubmit(form.getFieldsValue(["email", "password", "code"]));
        form.resetFields();
      }}
      title="忘记密码"
      okText="提交"
      cancelText="取消"
    >
      <Form<IFormValues> form={form} style={{ margin: "40px 0px" }}>
        <Form.Item
          label="邮箱"
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
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          label="验证码"
          name="code"
          rules={[
            { required: true, message: "验证码不可为空" },
            { len: 6, message: "验证码格式有误" },
          ]}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Input maxLength={6} placeholder="请输入验证码" />
            </Col>
            <Col span={8}>
              <Button disabled={isSendCodeBtnDisabled} onClick={onSendCode}>
                {isSendCodeBtnDisabled
                  ? `${sendCodeBtnSecond}秒后重发`
                  : "发送验证码"}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          label="新密码"
          name="password"
          rules={[
            { required: true, message: "密码不可为空" },
            { min: 6, message: "密码长度不少于6个字符" },
            { max: 20, message: "密码长度过长" },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          label="确认密码"
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
        >
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ForgetPwdModal;
