import { useUserStore } from "@/stores/user";
interface IProps {}

function UserInfoPage({}: IProps) {
  const { nickname, email, chatbotToken } = useUserStore();

  return (
    <>
      <p>邮箱：{email}</p>
      <p>昵称：{nickname}</p>
      <p>机器人Token：{chatbotToken}</p>
    </>
  );
}

export default UserInfoPage;
