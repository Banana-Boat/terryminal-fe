import { create } from 'zustand'
import { IUser } from './types'


interface IUserStore extends IUser {
  token: string
  updateToken: (token: string) => void
  updateUserInfo: (user: IUser) => void
}

const useUserStore = create<IUserStore>((set) => ({
  id: 0,
  nickname: '',
  email: '',
  chatbotToken: 0,
  token: '',
  updateToken: (token: string) => set({ token }),
  updateUserInfo: (user: IUser) => set(user),
}))

export default useUserStore