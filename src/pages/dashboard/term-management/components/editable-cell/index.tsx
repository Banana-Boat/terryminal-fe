import { ITerminal } from "@/stores/term/types";
import { Input, InputRef } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";

interface IProps {
  title: React.ReactNode;
  dataIndex: keyof ITerminal;
  children: React.ReactNode;
  record: ITerminal;
  editable: boolean;
  onSave: (record: ITerminal) => void;
}

function EditableCell({
  record,
  editable,
  onSave,
  children,
  title,
  dataIndex,
  ...restProps
}: IProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isEditing) {
      inputRef.current!.focus();
      setInputValue(dataIndex ? record[dataIndex].toString() : "");
    }
  }, [isEditing]);

  const save = useCallback(() => {
    if (dataIndex && inputValue !== record[dataIndex].toString()) {
      onSave({ ...record, [dataIndex]: inputValue });
    }
    setIsEditing((prev) => !prev);
  }, [inputValue]);

  const childNode = !editable ? (
    children
  ) : isEditing ? (
    <Input
      ref={inputRef}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onPressEnter={save}
      onBlur={save}
    />
  ) : (
    <div
      className="editable-cell-wrap"
      style={{ paddingRight: 24 }}
      onClick={() => setIsEditing((prev) => !prev)}
    >
      {children}
    </div>
  );

  return <td {...restProps}>{childNode}</td>;
}

export default EditableCell;
