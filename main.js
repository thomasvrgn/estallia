/*//////////////////////////////////////
          DISCORD BOT TEMPLATE
                  Main
//////////////////////////////////////*/

import Discord from 'discord.js'                                                        // Importing Discord.js package
import FS      from 'fs'                                                                // Importing FS package
import PATH    from 'path'                                                              // Importing PATH package
import ENV     from 'dotenv'                                                            // Importing DotENV package

const CONFIG          = ENV.config().parsed,                                            // Parsing configuration
      client          = new Discord.Client()                                            // Client initialization
      client.commands = new Discord.Collection()                                        // Client commands collection creation

class Bot {

    constructor (options = {
        commands  : 'commands'  ,
        events    : 'events'    ,
    }) {

        this.options = options

    }

    init () {
        FS.exists(PATH.resolve(PATH.join(__dirname, this.options.commands)), bool => {  // Commands loading
            if (!bool) return
            FS.readdir(PATH.resolve(PATH.join(__dirname, this.options.commands)), (error, content) => {
                if (error) throw error
                content = content.filter(x => x.endsWith('.js'))
                                 .map(x => x = PATH.resolve(PATH.join(__dirname, this.options.commands, x)))

                for (const file of content) {
                    
                    import(file).then(value => {
                        
                        if (value.default.length === 0) return
                        
                        value = value.default
                        const name     = value.name        ?? PATH.parse(file).base.split('.')[0] ,
                              desc     = value.description ?? 'Some description'                  ,
                              category = value.category    ?? 'Some category'                     ,
                              run      = value.run         ?? Object

                        if (!client.commands[category]) client.commands[category] = new Discord.Collection()

                        client.commands[category].set(name, {category, desc, run})

                    })

                }

            })
        })

        FS.exists(PATH.resolve(PATH.join(__dirname, this.options.events)), bool => {    // Events loading
            if (!bool) return
            FS.readdir(PATH.resolve(PATH.join(__dirname, this.options.events)), (error, content) => {
                if (error) throw error
                content = content.filter(x => x.endsWith('.js'))
                                 .map(x => x = PATH.resolve(PATH.join(__dirname, this.options.events, x)))

                for (const file of content) {
                    
                    import(file).then(value => {
                        
                        if (value.default.length > 0) {

                            value = value.default
                            const name = value.name    ?? PATH.parse(file).base ,
                                run  = new value.run ?? Object

                            client.on(name, run.event.bind(null, client))

                        }
                        
                        

                    })

                }

            })
        })

    }

}

new Bot().init()

client.login(CONFIG.TOKEN)