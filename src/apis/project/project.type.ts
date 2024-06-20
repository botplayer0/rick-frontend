export interface ResponseProjectDetail {
  project_id: number
  project_name: string
  project_desc?: string
  create_user: number
  public?: boolean
  project_avatar?: string
  created_at: number
  updated_at: number
  member: number
}

export interface ResponseProjectList {
  project_id: number
  project_name: string
  project_desc?: string
  create_user: number
  public?: boolean
  project_avatar?: string
  created_at: number
  updated_at: number
  member: number
}
