import { Descriptions } from "antd";

interface IProps {
  title: string;
  btns?: React.ReactNode;
}

function PageHeader({ title, btns }: IProps) {
  return (
    <>
      <Descriptions extra={btns} title={title} />
    </>
  );
}

export default PageHeader;
