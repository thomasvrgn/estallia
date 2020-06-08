/*//////////////////////////////////////
          DISCORD BOT TEMPLATE
                 Events
//////////////////////////////////////*/

export default {
    name : 'ready',

    run  : class {

        constructor () {}

        async event (client) {
            
            client.user.setPresence({
                status: 'online',
                game  : {
                    name : 'ESTALLIA | 1.9.4 ➥ 1.15.2',
                    type : 'STREAMING',
                    url: "https://www.twitch.tv/estallia"
                }
            })
        } 

    }
}
