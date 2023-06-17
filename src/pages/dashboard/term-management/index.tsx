import PageHeader from "@/components/page-header";
import { Button } from "antd";

interface IProps {}

function TermManagementPage({}: IProps) {
  return (
    <>
      <PageHeader title="终端管理" btns={<Button>添加</Button>} />
    </>
  );
}

export default TermManagementPage;
