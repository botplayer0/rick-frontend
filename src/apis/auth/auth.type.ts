

interface RequestAuthRegister {
  account: string
  password: string
}

interface RequestAuthLogin {
  account: string,
  password: string
}

interface ResponseAuthLogin {
  user_id: number,
  email: string
  nickname: string
  role: number
  avatar?: string
  last_login: number
  valid: number
  exp: number
  token: string
}

export type {
  RequestAuthLogin,
  RequestAuthRegister,
  ResponseAuthLogin
}