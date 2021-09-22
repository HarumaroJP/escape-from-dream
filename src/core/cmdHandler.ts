export class CmdHandler {
  static commands: Map<string, (args: string[]) => Promise<void>> = new Map<string, (args: string[]) => Promise<void>>()

  static Register(name: string, method: (args: string[]) => Promise<void>) {
    this.commands.set(name, method)
  }

  static async Execute(cmdStr: string) {
    const args = cmdStr.split(' ')
    const command = this.commands.get(args[0])

    if (command == undefined) return
    args.shift() //引数だけにする
    await command(args)
  }
}
