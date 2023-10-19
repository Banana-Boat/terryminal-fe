import { useUserStore } from "@/stores/user";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Descriptions, Drawer, Form, Input, message } from "antd";
import "./index.module.scss";
import { useCallback, useEffect, useState } from "react";
import { updateUserInfo } from "./api";
import { formatFormData } from "@/utils";
import PageHeader from "@/components/page-header";
import { getUserInfo } from "@/utils/api";

interface IProps {}

interface IFormValues {
  password?: string;
  repassword?: string;
  nickname?: string;
}

function UserInfoPage({}: IProps) {
  const { nickname, email, chatbotToken } = useUserStore();
  const [isShowEditUserInfoDrawer, setIsShowEditUserInfoDrawer] =
    useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const onFinish = useCallback(async (value: IFormValues) => {
    if (!value.nickname && !value.password) return;

    if (
      await updateUserInfo(
        formatFormData({ password: value.password, nickname: value.nickname })
      )
    ) {
      message.success("修改成功", 2);
    }
  }, []);

  return (
    <>
      <PageHeader
        title="个人信息"
        btns={
          <Button onClick={() => setIsShowEditUserInfoDrawer(true)}>
            修改
          </Button>
        }
      />
      <Descriptions>
        <Descriptions.Item label="邮箱">{email}</Descriptions.Item>
        <Descriptions.Item label="昵称">{nickname}</Descriptions.Item>
        <Descriptions.Item label="密码">********</Descriptions.Item>
        <Descriptions.Item label="机器人Token数">
          {chatbotToken}
          <Button
            onClick={() => message.info("功能开发中", 2)}
            style={{ marginLeft: 8 }}
            type="primary"
            size="small"
            shape="circle"
            icon={<PlusOutlined />}
          />
        </Descriptions.Item>
      </Descriptions>

      <Drawer
        title="修改个人信息"
        onClose={() => setIsShowEditUserInfoDrawer(false)}
        open={isShowEditUserInfoDrawer}
      >
        <Form<IFormValues> onFinish={onFinish}>
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[{ max: 10, message: "昵称过长" }]}
          >
            <Input placeholder="请输入昵称" />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="password"
            rules={[{ min: 6, message: "密码长度不少于6个字符" }]}
          >
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="repassword"
            dependencies={["password"]}
            rules={[
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
            <Input type="password" placeholder="请再次输入密码" />
          </Form.Item>

          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              htmlType="submit"
              style={{ width: 120 }}
              type="primary"
              shape="round"
            >
              修改
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default UserInfoPage;
