/*  删除对象中值为 空或undefined或null 的属性 */
export function formatFormData(data: any) {
  for (const key in data) {
    if (data[key] === undefined || data[key] === null || data[key] === "")
      delete data[key];
  }
  return data;
}
