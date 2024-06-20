import { apiPasteGetList } from "@/apis/paste/paste"
import { ResponsePasteList } from "@/apis/paste/paste.type"
import { create } from "zustand"



interface IStoreProps {
  pasteList: ResponsePasteList[]
  setPasteList: (pList: ResponsePasteList[]) => void
  refreshPasteList: (page: number, pageSize: number) => void
}

const usePasteStore = create<IStoreProps>((set, get) => ({
  pasteList: null,
  setPasteList: (pList) => set(() => ({ pasteList: pList })),
  refreshPasteList: async (page, pageSize) => {
    const response = await apiPasteGetList(page, pageSize);
    if (response.code === 0) {
      get().setPasteList(response.data)
    }
  }
}))

export default usePasteStore