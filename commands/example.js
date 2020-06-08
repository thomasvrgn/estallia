/*//////////////////////////////////////
          DISCORD BOT TEMPLATE
                Commands
//////////////////////////////////////*/

export default {

    name        : 'example',
    description : 'Example command',
    category    : 'example',

    run         : class {

        constructor (args, client) {
            
            this.arguments = args
            this.client    = client

        }

    }

}