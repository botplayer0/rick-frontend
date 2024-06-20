import { create } from "zustand"
import type { ResponseProjectList } from "@/apis/project/project.type"


interface IStoreProps {
  projectList: ResponseProjectList[]
  projectListWithPaging: ResponseProjectList[],
  setProjectList: (pList: ResponseProjectList[]) => void
  refreshProjectList: () => void
}

const useProjectStore = create<IStoreProps>((set) => ({
  projectList: null,
  projectListWithPaging: null,
  setProjectList: (pList) => set(() => ({ projectList: pList })),
  refreshProjectList: async () => { }
}))

export default useProjectStore