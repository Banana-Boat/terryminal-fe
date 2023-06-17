/*  删除对象中值为 空或undefined或null 的属性。注：antd的Form中输入框的值可能为undefined或"" */
export function formatFormData(data: any) {
  for (const key in data) {
    if (data[key] === undefined || data[key] === null || data[key] === "")
      delete data[key];
  }
  return data;
}
