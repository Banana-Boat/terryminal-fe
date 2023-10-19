import { Form, Modal, Radio, Select, message } from "antd";
import { useCallback, useState } from "react";
import { TermPanelMode } from "../../types";
import { useTermStore } from "@/stores/term";

interface IProps {
  isShow: boolean;
  onLaunch: (value: IFormValues) => void;
  onCancel: () => void;
}

export interface IFormValues {
  mode: TermPanelMode;
  termsToLaunch: string[];
}

function LaunchConfigModal({ isShow, onCancel, onLaunch }: IProps) {
  const form = Form.useForm<IFormValues>()[0];
  const termPanelMode = Form.useWatch("mode", form);
  const { terms } = useTermStore();

  const onOk = useCallback(() => {
    const { mode, termsToLaunch } = form.getFieldsValue([
      "mode",
      "termsToLaunch",
    ]);
    if (
      (mode === TermPanelMode.DOUBLE && termsToLaunch.length !== 2) ||
      (mode === TermPanelMode.SINGLE && termsToLaunch.length !== 1)
    ) {
      message.warning("填写信息有误", 2);
      return;
    }
    onLaunch({ mode, termsToLaunch });
    form.resetFields();
  }, [form]);

  return (
    <Modal
      open={isShow}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      onOk={onOk}
      title="启动配置"
      okText="启动"
      cancelText="取消"
      centered
    >
      <Form<IFormValues>
        form={form}
        initialValues={{
          mode: TermPanelMode.SINGLE,
          termsToLaunch: [],
        }}
        style={{ margin: "50px 0px" }}
      >
        <Form.Item label="模式" name="mode">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={TermPanelMode.SINGLE}>单终端</Radio.Button>
            <Radio.Button
              value={TermPanelMode.DOUBLE}
              disabled={terms.length > 1 ? false : true}
            >
              双终端
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="终端实例"
          name="termsToLaunch"
          rules={[
            {
              type: "array",
              len: termPanelMode === TermPanelMode.SINGLE ? 1 : 2,
              message: "实例个数有误",
            },
          ]}
        >
          <Select
            onChange={() => {}}
            options={terms.map((item) => ({
              label: item.name + `（${item.remark}）`,
              value: item.id,
            }))}
            placement="topLeft"
            mode="multiple"
            allowClear
            showSearch={false}
            placeholder="请选择终端实例"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default LaunchConfigModal;
