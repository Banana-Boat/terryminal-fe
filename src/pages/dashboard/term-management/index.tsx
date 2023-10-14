import PageHeader from "@/components/page-header";
import {
  Button,
  Popconfirm,
  Popover,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import CreateTermDrawer, {
  ICreateTermFormValues,
} from "./components/create-term-drawer";
import { ColumnsType } from "antd/es/table";
import { ITerminal } from "@/stores/term/types";
import { formatTime } from "@/utils";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import EditableCell from "./components/editable-cell";
import "./index.module.scss";
import { termStore, useTermStore } from "@/stores/term";
import { createTerm, destroyTerm, getUserTerms, updateTermInfo } from "./api";

interface IProps {}

const columns: ColumnsType<ITerminal> = [
  {
    title: "实例名称",
    dataIndex: "name",
    width: 150,
    fixed: "left",
  },
  {
    title: "ID",
    dataIndex: "id",
    width: 100,
    ellipsis: {
      showTitle: false,
    },
    render: (text: string) => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    ),
  },
  {
    title: "备注",
    dataIndex: "remark",
    width: 200,
    // onCell中的返回的对象会被传入到EditableCell组件中
    onCell: (record: ITerminal) => ({
      record,
      editable: true,
      onSave: async (row: ITerminal) => {
        if (await updateTermInfo({ terminalID: row.id, remark: row.remark })) {
          message.success("修改成功", 2);
        }
      },
      dataIndex: "remark",
      title: "备注",
    }),
  },
  {
    title: "终端模版",
    dataIndex: "templateID",
    width: 200,
    render: (templateID: number) => {
      const template = termStore
        .getState()
        .termTemplates.find((item) => item.id === templateID);

      return !template ? (
        <Typography.Text type="secondary" italic>
          数据缺失
        </Typography.Text>
      ) : (
        <>
          <span style={{ marginRight: 5 }}>{template.name}</span>
          <Popover
            content={
              <div style={{ width: 250 }}>
                <Typography.Text type="secondary">模版大小：</Typography.Text>
                <span>{template.size}</span>
                <br />
                <Typography.Text type="secondary">模版描述：</Typography.Text>
                <span>{template.description}</span>
              </div>
            }
            title="模版信息"
            trigger="click"
          >
            <InfoCircleOutlined style={{ color: "#3875F6" }} />
          </Popover>
        </>
      );
    },
  },
  {
    title: "大小",
    dataIndex: "size",
    width: 100,
  },
  {
    title: "使用时长",
    dataIndex: "totalDuration",
    width: 150,
    render: (totalDuration: number) => {
      return <span>{formatTime(totalDuration)}</span>;
    },
  },
  {
    title: "操作",
    key: "action",
    width: 100,
    fixed: "right",
    render: (_, record) => (
      <>
        <Popconfirm
          title="是否确定销毁实例"
          okText="确定"
          cancelText="取消"
          onConfirm={async () => {
            if (await destroyTerm(record.id)) {
              message.success("销毁成功", 2);
            }
          }}
        >
          <a>销毁</a>
        </Popconfirm>
      </>
    ),
  },
];

function TermManagementPage({}: IProps) {
  /* 创建实例抽屉相关 */
  const [isShowCreateTermDrawer, setIsShowCreateTermDrawer] = useState(false);
  const onCreateTermDrawerFinish = useCallback(
    async (value: ICreateTermFormValues) => {
      if (!value.remark) value.remark = "";

      if (await createTerm(value)) {
        message.success("创建成功", 2);
        setIsShowCreateTermDrawer(false);
      }
    },
    []
  );

  /* 表格相关 */
  const { terms } = useTermStore();
  const [dataSource, setDataSource] = useState<
    (ITerminal & { key: React.Key })[]
  >([]);
  useEffect(() => {
    getUserTerms();
  }, []);

  useEffect(() => {
    setDataSource(
      terms.map((term) => ({
        ...term,
        key: term.id,
      }))
    );
  }, [terms]);

  return (
    <>
      <PageHeader
        title="终端管理"
        btns={
          <Button
            onClick={() => setIsShowCreateTermDrawer(true)}
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
          >
            创建新实例
          </Button>
        }
      />

      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowClassName={() => "editable-row"}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 950 }}
      />

      <CreateTermDrawer
        isShow={isShowCreateTermDrawer}
        onClose={() => setIsShowCreateTermDrawer(false)}
        onFinish={onCreateTermDrawerFinish}
      />
    </>
  );
}

export default TermManagementPage;
