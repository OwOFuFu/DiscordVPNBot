const {CommandInteraction} = require("discord.js");
const openvpnmanager = require('node-openvpn');
/**
 * @type {{name: string, description: string, permission: string, execute(*)}}
 */
module.exports = {
    name: "disconnect",
    description: "Disconnect From VPN",
    permission: "ADMINISTRATOR",
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {

        const opts = {
            host: '127.0.0.1',
            port: 1337,
            timeout: 1500,
            logpath: 'log.txt'
        };

        const openvpn = openvpnmanager.connect(opts)

        openvpnmanager.disconnect();

        openvpn.on('disconnected', () => {
            openvpnmanager.destroy()
        });
        openvpn.on('state-change', state => {
            console.log(state)
        });

        interaction.reply({content: "Successfully Disconnected From VPN"})
    }
}