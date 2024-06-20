import http, { IResponse } from "../../utils/http";
import { RequestPasteNew, RequestPasteUpdate, ResponsePasteDetail, ResponsePasteList, ResponsePasteNew } from "./paste.type";


export const apiPasteNew = async (data: RequestPasteNew) => {
  const response = await http.post<ResponsePasteNew>('/tools/paste/new', data)
  return response
}

export const apiPasteUpdate = async (pasteId: number, data: RequestPasteUpdate) => {
  const response = await http.post<IResponse>(`/tools/paste/${pasteId}/update`, data)
  return response
}

export const apiPasteGetList = async (page: number, pageSize: number) => {
  const response = await http.get<ResponsePasteList[]>("/tools/paste/list", { params: { page, pageSize } })
  return response
}

export const apiPasteGetDetail = async (pasteId: number) => {
  const response = await http.get<ResponsePasteDetail>(`/tools/paste/${pasteId}/detail`)
  return response
}


export const apiPasteDelete = async (pasteId: number) => {
  const response = await http.delete<IResponse>(`/tools/paste/${pasteId}/delete`, null)
  return response
}