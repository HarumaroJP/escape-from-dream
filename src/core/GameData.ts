export class GameData {
  nameList: Map<number, string> = new Map<number, string>()
  lineList: { id: number; line: string }[] = []

  applyData(data: any) {
    data['names'].forEach((elem) => {
      this.nameList.set(elem.id, elem.name)
    })

    data['lines'].forEach((elem) => {
      this.lineList.push({ id: elem.id, line: elem.line })
    })
  }
}
