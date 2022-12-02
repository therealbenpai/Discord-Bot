const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Preform a giveaway!')
        .setDefaultPermission(false)
        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('start')
                    .setDescription('Start a giveaway!')
                    .addChannelOption(
                        option =>
                            option
                                .setName('channel')
                                .setDescription('The channel to start the giveaway in')
                                .setRequired(true)
                    )
                    .addStringOption(
                        option =>
                            option
                                .setName('prize')
                                .setDescription('The prize for the giveaway')
                                .setRequired(true)
                    )
                    .addIntegerOption(
                        option =>
                            option
                                .setName('duration')
                                .setDescription('The duration of the giveaway (in minutes)')
                                .setRequired(true)
                    )
                    .addIntegerOption(
                        option =>
                            option
                                .setName('winners')
                                .setDescription('The number of winners')
                                .setRequired(true)
                    )
                    .addStringOption(
                        option =>
                            option
                                .setName('requirement1')
                                .setDescription('The first requirement for the giveaway')
                                .setRequired(false)
                    )
                    .addStringOption(
                        option =>
                            option
                                .setName('requirement2')
                                .setDescription('The second requirement for the giveaway')
                                .setRequired(false)
                    )
                    .addStringOption(
                        option =>
                            option
                                .setName('requirement3')
                                .setDescription('The third requirement for the giveaway')
                                .setRequired(false)
                    )
        )
        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('reroll')
                    .setDescription('Reroll a giveaway!')
                    .addStringOption(
                        option =>
                            option
                                .setName('giveaway_id')
                                .setDescription('The id of the giveaway')
                                .setRequired(true)
                    )
        )
        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('end')
                    .setDescription('End a giveaway!')
                    .addStringOption(
                        option =>
                            option
                                .setName('giveaway_id')
                                .setDescription('The id of the giveaway')
                                .setRequired(true)
                    )
        )
        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('edit')
                    .setDescription('Edit a giveaway!')
                    .addStringOption(
                        option =>
                            option
                                .setName('giveaway_id')
                                .setDescription('The id of the giveaway')
                                .setRequired(true)
                    )
                    .addStringOption(
                        option =>
                            option
                                .setName('prize')
                                .setDescription('The prize for the giveaway')
                                .setRequired(false)
                    )
                    .addIntegerOption(
                        option =>
                            option
                                .setName('winners')
                                .setDescription('The number of winners')
                                .setRequired(false)
                    )
                    .addStringOption(
                        option =>
                            option
                                .setName('requirement1')
                                .setDescription('The first requirement for the giveaway')
                                .setRequired(false)
                    )
                    .addStringOption(
                        option =>
                            option
                                .setName('requirement2')
                                .setDescription('The second requirement for the giveaway')
                                .setRequired(false)
                    )
                    .addStringOption(
                        option =>
                            option
                                .setName('requirement3')
                                .setDescription('The third requirement for the giveaway')
                                .setRequired(false)
                    )
        )
        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('delete')
                    .setDescription('Delete a giveaway!')
                    .addStringOption(
                        option =>
                            option
                                .setName('giveaway_id')
                                .setDescription('The id of the giveaway')
                                .setRequired(true)
                    )
        )
}