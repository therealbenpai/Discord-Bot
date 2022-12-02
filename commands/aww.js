const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aww')
        .setDescription('Replies with a post from r/aww!')
}