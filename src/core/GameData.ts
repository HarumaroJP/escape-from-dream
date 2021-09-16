export class GameData {
  mysteryFlags: Map<number, boolean> = new Map<number, boolean>()
  mysteryLines: { id: number; line: { id: number; line: string }[] }[] = []
  nameList: Map<number, string> = new Map<number, string>()
  configList: any[] = []

  applyData(data: any) {
    data['names'].forEach((elem) => {
      this.nameList.set(elem.id, elem.name)
    })

    data['mystery'].forEach((elem) => {
      this.mysteryLines.push({ id: elem.id, line: elem.line })
      this.mysteryFlags.set(elem.id, false)
    })

    data['config'].forEach((elem) => {
      this.configList.push(elem)
    })
  }
}
