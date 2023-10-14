/*  删除对象中值为 空或undefined或null 的属性。注：antd的Form中输入框的值可能为undefined或"" */
export function formatFormData(data: any) {
  for (const key in data) {
    if (data[key] === undefined || data[key] === null || data[key] === "")
      delete data[key];
  }
  return data;
}

/* 秒数 -> h小时m分钟s秒 */
export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const res =
    (hours > 0 ? hours + "小时" : "") +
    (minutes > 0 ? minutes + "分钟" : "") +
    (remainingSeconds >= 0 ? remainingSeconds + "秒" : "");

  return res;
}
