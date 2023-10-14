import { useTermStore } from "@/stores/term";
import { ITerminalTemplate } from "@/stores/term/types";
import { Button, Drawer, Form, Input, Select, Typography } from "antd";
import { useEffect, useState } from "react";

export interface ICreateTermFormValues {
  templateID: number;
  remark: string;
}

interface IProps {
  isShow: boolean;
  onClose: () => void;
  onFinish: (values: ICreateTermFormValues) => void;
}

function CreateTermDrawer({ isShow, onClose, onFinish }: IProps) {
  const form = Form.useForm<ICreateTermFormValues>()[0];
  const [selectedTemplate, setSelectedTemplate] = useState<
    ITerminalTemplate | undefined
  >(undefined);

  const { termTemplates } = useTermStore();

  return (
    <Drawer title="创建终端实例" onClose={onClose} open={isShow}>
      <Form<ICreateTermFormValues>
        form={form}
        onFinish={(value) => {
          onFinish(value);
          form.resetFields();
          setSelectedTemplate(undefined);
        }}
      >
        <Form.Item
          label="终端模版"
          name="templateID"
          rules={[{ required: true, message: "终端模版不可为空" }]}
        >
          <Select
            onChange={(value) => {
              setSelectedTemplate(
                termTemplates.find((item) => item.id === value)
              );
            }}
            options={termTemplates.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item label="模版描述">
          <Typography.Text type="secondary">
            {selectedTemplate?.description ?? "暂无数据"}
          </Typography.Text>
        </Form.Item>

        <Form.Item label="模版大小">
          <Typography.Text type="secondary">
            {selectedTemplate?.size ?? "暂无数据"}
          </Typography.Text>
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
          rules={[{ max: 1024, message: "备注长度过长" }]}
        >
          <Input.TextArea placeholder="请输入备注" />
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
            创建
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default CreateTermDrawer;
