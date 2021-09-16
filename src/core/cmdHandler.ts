export class CmdHandler {
  static commands: Map<string, (args: string[]) => void> = new Map<string, (args: string[]) => void>()

  static Register(name: string, method: (args: string[]) => void) {
    this.commands.set(name, method)
  }

  static Execute(cmdStr: string) {
    const args = cmdStr.split(' ')
    const command = this.commands.get(args[0])

    if (command == undefined) return
    args.shift() //引数だけにする
    command(args)
  }
}
