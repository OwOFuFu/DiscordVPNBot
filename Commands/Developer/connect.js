const { CommandInteraction, Client } = require("discord.js");
const openvpnmanager = require('node-openvpn');

/**
 * @type {{name: string, options: [{name: string, description: string, type: string, choices: [{name: string, value: string},{name: string, value: string}], required: boolean}], description: string, permission: string, execute(*, *)}}
 */
module.exports = {
    name: "connect",
    description: "Connect To VPN",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "server",
            description: "Choose The Server",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Europe",
                    value: "Europe",
                }
            ]
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {

        const opts = {
            host: 'pool-1.prd.nl.amsterdam.ovpn.com',
            port: 1337,
            timeout: 1500,
            logpath: 'log.txt'
        };
        const auth = {
            user: 'freeopenvpn',
            pass: 'freeopenvpn',
        };
        const openvpn = openvpnmanager.connect(opts)

        const choices = interaction.options.getString("server");

        switch (choices) {
            case "Europe" : {
                interaction.reply({content: "Connecting To European Server...", ephemeral: true});
                openvpn.on('connected', () => {
                    openvpnmanager.authorize(auth);
                });
                openvpn.on('state-change', state => {
                    console.log(state)
                });
            }
            break;
        }
    }
}