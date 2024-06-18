interface ResponseProjectDetail {
  project_id: number
  project_name: string
  project_desc?: string
  create_user: number
  public?: boolean
  project_avatar?: string
  created_at: string
  case_count?: number
  member_count?: number
}

interface ResponseProjectList {
  project_id: number
  project_name: string
  create_user: number
  public?: boolean
  created_at: string
  updated_at: string
  case_count?: number
  member_count?: number
}
