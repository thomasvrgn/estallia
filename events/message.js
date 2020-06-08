/*//////////////////////////////////////
          DISCORD BOT TEMPLATE
                 Events
//////////////////////////////////////*/

import Config from '../config'

let cooldown = Date.now()

export default {
    name : 'message',

    run  : class {

        constructor () {}

        async event (client, message) {
            if (message.author.bot) return
            if (!message.content) return

            const destructured      = message.content.split(' '),
                  command           = destructured.shift()

            if (!command.startsWith(Config.prefix)) return

            const command_no_prefix = command.slice(Config.prefix.length, command.length).toLowerCase(),
                  bot_cmd           = client.commands.get(command_no_prefix)

            if (!bot_cmd) return
            const cmd = new bot_cmd.run(client, destructured.slice(0), message)
            if (cooldown - Date.now() > 0) {
                
                const date      = ((cooldown - Date.now() )/ 1000).toFixed(1)
                const remaining = date > 1 ? date + ' secondes' : date + ' seconde'
                message.channel.send(`Vous pourrez de nouveau effectuer cette commande dans ${remaining}.`)
            } else {
                cooldown = Date.now() + Config.cooldown
                cmd.command()
            }
            
// ESTALLIA | 1.9.4 ➥ 1.15.2
        } 

    }
}