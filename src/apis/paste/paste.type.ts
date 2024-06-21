import dayjs from "dayjs"

export enum ContentTypeEnum {
  CODE = 1,
  JSON = 2,
  TEXT = 3
}


export interface RequestPasteNew {
  title: string
  expired: number
  content: string
  content_type: ContentTypeEnum
}

export interface RequestPasteUpdate {
  title?: string
  expired?: number
  content?: string
  content_type?: ContentTypeEnum
}

export interface ResponsePasteNew {
  paste_id: number
}



export interface ResponsePasteList {
  paste_id: number
  title: string
  expired: number
  create_user: number
}


export interface ResponsePasteDetail {
  paste_id: number
  title: string
  expired: number
  create_user: number
  content: string
  content_type: number
  created_at: number
  updated_at: number
}

export interface PasteDetailFormProps {
  title: string
  expired: dayjs.Dayjs
  content: string
  content_type: string
}
