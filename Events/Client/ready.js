const {Client} = require("discord.js");
const mongoose = require("mongoose");
const { DatabaseUrl } = require("../../Structures/config.json");
/**
 * @type {{once: boolean, name: string, execute(*): void}}
 */
module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
     */
    execute(client) {
        client.user.setActivity("I Love YUMAHISAI ❤", {type: "WATCHING"});

        if(!DatabaseUrl) return;
        mongoose.connect(DatabaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The client is now connected to the database!")
        }).catch((err) => {
            console.log(err)
        });
    }
}