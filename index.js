// @ts-nocheck

//? Require the necessary discord.js classes
const {
	Client,
	DiscordAPIError,
	DiscordjsError,
	DiscordjsTypeError,
	Message,
	ChatInputCommandInteraction
} = require(`discord.js`);
const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");
const Intigrations = require("@sentry/integrations");
require("dotenv").config();
const uuid = require("uuid")

//? JSON Config Files
const { prefix, namespace_uuid } = require(`./config-files/config.json`);
const {
	MAIN_TOKEN: mainToken,
	MAIN_CLIENT_ID: mainClientID,
	MAIN_CLIENT_SECRET: mainClientSecret,
	ASSISTANT_TOKEN: assistantToken,
	ASSISTANT_CLIENT_ID: assistantClientID,
	ASSISTANT_CLIENT_SECRET: assistantClientSecret
} = process.env;
const { Giveaways } = require(`./src/database.js`);
const { default: giveaway } = require("./commands/giveaway");

const regexList = {
	swares: /(tf)|(wtf)|(fuck)|(bitch)|(cunt)|(damn)|(shit)|(stfu)|(fu)|(f you)/gmi,
	selfBan: /(ban me)/gmi,
}

/**
 * @param {ChatInputCommandInteraction | Message} interaction
 * @param {Error|DiscordAPIError|DiscordjsError|DiscordjsTypeError} error 
 * @param {string} bot
 */

async function sendError(interaction, error, bot) {
	const user = interaction.author ?? interaction.user
	const errorID = uuid.v5(error.message, namespace_uuid)
	const supportServerInvite = 'https://discord.gg/nZUXdVuaTZ'
	Sentry.captureException(error, {
		tags: {
			errorID,
			botType: bot
		},
		level: 'error',
		user: (user) ? {
			id: user.id,
			name: user.tag
		} : undefined
	})
	const messageData = ["An error has occured. Please join the support server and report this error.","","Error ID: " + errorID,"","Server Link: " + supportServerInvite].join('\n')
	if (interaction.author) {
		interaction.channel.send(
			messageData
		)
	} else {
		interaction.reply({
			content: messageData,
			ephemeral: true
		})
	}
}

function getUnixTime() {
	return Math.floor(Date.now() / 1000);
}

//? Discord Configuration
const mainClient = new Client({
	intents: [
		1, // GUILDS
		2, // GUILD_MEMBERS
		4, // GUILD_BANS
		8, // GUILD_EMJOS_AND_STICKERS
		64, // GUILD_INVITES
		256, // GUILD_PRESENCES
		512, // GUILD_MESSAGES
		32768 // MESSAGE_CONTENT
	],
	presence: {
		activities: [
			{
				name: 'over the server',
				type: 5
			}
		],
		status: 'dnd'
	}
});

const assistantClient = new Client({
	intents: [
		1, // GUILDS
		2, // GUILD_MEMBERS
		4, // GUILD_BANS
		8, // GUILD_EMJOS_AND_STICKERS
		64, // GUILD_INVITES
		256, // GUILD_PRESENCES
		512, // GUILD_MESSAGES
		32768 // MESSAGE_CONTENT
	],
	presence: {
		activities: [
			{
				name: 'over the server',
				type: 5
			}
		],
		status: 'dnd'
	}
});

//? Sentry Configuration
Sentry.init(
	{
		dsn: process.env.SENTRY_URL,
		sampleRate: 1.0,
		serverName: "Main PC",
		integrations: [
			new ProfilingIntegration(),
			new Intigrations.ExtraErrorData({ depth: 10 }),
			new Intigrations.SessionTiming(),
			new Intigrations.Transaction(),
			new Intigrations.ReportingObserver(),
			new Intigrations.CaptureConsole({
				levels: ['error', 'critical', 'fatal', 'warn']
			})
		],
		// @ts-ignore
		profilesSampleRate: 1.0,
		environment: "MasterDevelopment",
		release: "v1.1.2-Private_Alpha",
		sendDefaultPii: true
	}
)

//? On startup code
mainClient.once(`ready`, () => {
	console.log(`The core bot has been properly started.`);
});

assistantClient.once(`ready`, () => {
	console.log(`The assistant bot has been properly started.`);
});

//? Command Handling
mainClient.on(`interactionCreate`, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	//? Quick Variables
	const intermember = interaction.member;
	const interuser = interaction.user;

	//? Command name collector
	const { commandName } = interaction;

	try {
		switch (commandName) {
			case 'server':
				const serverInfo = {
					name: interaction.guild.name,
					id: interaction.guild.id,
					owner: interaction.guild.ownerId,
					bans: interaction.guild.bans.cache.size,
					emojis: interaction.guild.emojis.cache.size,
					users: interaction.guild.memberCount,
					roles: interaction.guild.roles.cache.size,
					createdAt: Math.round(interaction.guild.createdTimestamp / 1000),
					channels: interaction.guild.channels.cache.size
				}
				const serverInfoText = [
					`**Server Name:** ${serverInfo.name}`,
					`**Server ID:** ${serverInfo.id}`,
					`**Server Owner:** <@${serverInfo.owner}>`,
					`**Server Bans:** ${serverInfo.bans}`,
					`**Server Emojis:** ${serverInfo.emojis}`,
					`**Server Users:** ${serverInfo.users}`,
					`**Server Roles:** ${serverInfo.roles}`,
					`**Server Created At:** <t:${serverInfo.createdAt}:f> (Relative: <t:${serverInfo.createdAt}:R>)`,
					`**Server Channels:** ${serverInfo.channels}`
				]
				const serverInfoEmbed = {
					title: `Server Information`,
					description: serverInfoText.join(`\n`),
					color: Math.floor(Math.random() * Math.pow(16, 6))
				}
				await interaction.reply({ embeds: [serverInfoEmbed] });
				break;
			case 'user':
				const uroles = interaction.guild.members.cache.get(interuser.id).roles.cache.map(role => {
					return `<@&${role.id}>`
				})
				uroles.pop()
				const upermsReadable = {
					// set the key as the original permision name and the value as the readable name
					AddReactions: "Add Reactions",
					Administrator: "Administrator",
					AttachFiles: "Attach Files",
					BanMembers: "Ban Members",
					ChangeNickname: "Change Personal Nickname",
					Connect: "Connect to Voice Channels",
					CreateInstantInvite: "Create Server Invite",
					CreatePrivateThreads: "Create Private Thread",
					CreatePublicThreads: "Create Public Thread",
					DeafenMembers: "Deafen Users in a Voice Channel",
					EmbedLinks: "Use 'Rich Links' in Messages",
					KickMembers: "Kick Members",
					ManageChannels: "Manage Channels",
					ManageEmojisAndStickers: "Manage Server Emojis & Stickers",
					ManageEvents: "Manage Events",
					ManageGuild: "Manage Server",
					ManageMessages: "Manage Messages",
					ManageNicknames: "Manage Other Member's Nicknames",
					ManageRoles: "Manage Server Roles",
					ManageThreads: "Manage Threads",
					ManageWebhooks: "Manage Webhooks",
					MentionEveryone: "Use @everyone",
					ModerateMembers: "Moderate Members",
					MoveMembers: "Move Members from one Voice Channel to another",
					MuteMembers: "Mute Members in a Voice Channel",
					PrioritySpeaker: "Have Priority when Speaking in a Voice Channel",
					ReadMessageHistory: "Read Message History",
					RequestToSpeak: "Raise Your Hand in Stages",
					SendMessages: "Send Messages",
					SendMessagesInThreads: "Send Messages in Threads",
					SendTTSMessages: "Send Text-To-Speach (TTS) Messages",
					Speak: "Talk in Voice Channels",
					Stream: "Stream in Voice Channels",
					UseApplicationCommands: "Use Slash Commands",
					UseEmbeddedActivities: "Use Embedded Activities",
					UseExternalEmojis: "Use Emojis from Other Servers",
					UseExternalStickers: "Use Stickers from Other Servers",
					UseVAD: "Use Voice Activity \[Detection\]",
					ViewAuditLog: "View the Audit Log",
					ViewChannel: "View Channels",
					ViewGuildInsights: "View Guild Insights"
				}
				const uperms = interaction.guild.members.cache.get(interuser.id).permissions.toArray().map(perm => {
					return `\n• ${upermsReadable[perm]}`
				})
				const userinfo = {
					username: interuser.username,
					discriminator: interuser.discriminator,
					id: interuser.id,
					avatar: interuser.avatarURL(),
					createdAt: interuser.createdAt.toLocaleString(),
					joinedAt: interaction.guild.members.cache.get(interuser.id).joinedAt.toLocaleString(),
					roles: uroles.join(' '),
					permissions: uperms.join(),
					presence: {
						status: interaction.guild.members.cache.get(interuser.id).presence.status,
						clientStatus: {
							desktop: interaction.guild.members.cache.get(interuser.id).presence.clientStatus.desktop ?? 'offline',
							mobile: interaction.guild.members.cache.get(interuser.id).presence.clientStatus.mobile ?? 'offline',
							web: interaction.guild.members.cache.get(interuser.id).presence.clientStatus.web ?? 'offline'
						},
						statusMessage: interaction.guild.members.cache.get(interuser.id).presence.activities.find(
							activity => activity.type === 'CUSTOM_STATUS'
						)?.details ?? 'No status message set'
					},
					isOwner: interaction.guild.ownerId === interuser.id,
					isBot: interuser.bot
				}
				const desDetails = [
					`Username: ${userinfo.username}`,
					`Discriminator: ${userinfo.discriminator}`,
					`ID: ${userinfo.id}`,
					`Created At: ${userinfo.createdAt}`,
					`Joined At: ${userinfo.joinedAt}`,
					`Roles: ${userinfo.roles}`,
					`Permissions: ${userinfo.permissions}`,
					`Presence: ${userinfo.presence.status}`,
					`Client Statuses:`,
					`Desktop: ${userinfo.presence.clientStatus.desktop}`,
					`Mobile: ${userinfo.presence.clientStatus.mobile}`,
					`Web: ${userinfo.presence.clientStatus.web}`,
					`Status Message: ${userinfo.presence.statusMessage}`,
					`Owner: ${userinfo.isOwner == true ? 'Yes' : 'No'}`,
					`Bot: ${userinfo.isBot == true ? 'Yes' : 'No'}`
				].join('\n')
				const userEmbed = {
					color: Math.floor(Math.random() * Math.pow(16, 6)),
					title: 'User Info for' + userinfo.username,
					description: desDetails,
					thumbnail: {
						url: userinfo.avatar
					},
					timestamp: new Date().toISOString()
				}
				await interaction.reply({ embeds: [userEmbed] })
				break;
			case 'aww':
				trees
				break;
			case 'support':
				const link = 'https://discord.gg/nZUXdVuaTZ'
				interaction.reply(`Here is the link to the support server: ${link}`)
				break;
			case 'giveaway':
				switch (interaction.options.getSubcommand()) {
					case 'start':
						const giveawayChannel = interaction.options.getChannel('channel')
						const giveawayDuration = interaction.options.getInteger('duration')
						const giveawayPrize = interaction.options.getString('prize')
						const giveawayWinners = interaction.options.getInteger('winners')
						const requirements = [
							interaction.options.getString('requirement1') ?? null,
							interaction.options.getString('requirement2') ?? null,
							interaction.options.getString('requirement3') ?? null,
						]
						const giveawayManager = Giveaways.create({
							giveawayID: require('./src/randomGenerators').randomString(8),
							messageID: "to enter",
							channelID: giveawayChannel.id,
							guildID: interaction.guild.id,
							startAt: Date.now(),
							endAt: Date.now() + (giveawayDuration * 60000),
							endAtUnix: Math.floor(Date.now()/1000) + (giveawayDuration * 60),
							ended: false,
							winnerCount: giveawayWinners,
							prize: giveawayPrize,
							requirement1: requirements[0],
							requirement2: requirements[1],
							requirement3: requirements[2],
							hostedBy: interaction.user.id
						})
						const giveawayEmbed = {
							color: Math.floor(Math.random() * Math.pow(16, 6)),
							title: 'Giveaway',
							description: `React with 🎉 to enter!\nHosted by: ${interaction.user.tag}\nRequirements: ${requirements.join(', ')}`,
							footer: {
								text: `Ends at <t:${Math.floor(Date.now()/1000) + (giveawayDuration * 60)}:R>`
							}
						}
						const giveawayMessage = await giveawayChannel.send({ embeds: [giveawayEmbed] })
						giveawayManager.messageID = giveawayMessage.id
						break;
					case 'reroll':
						break;
					case 'end':
						break;
					case 'edit':
						const giveawayID = interaction.options.getString('giveawayid')
						const giveawayEdit = Giveaways.findOne({ where: { giveawayID: giveawayID } })
						if (!giveawayEdit) {
							interaction.reply('That giveaway does not exist')
							break;
						}
						const changeArray = [
							interaction.options.getString('prize') || giveawayEdit.get('prize'),
							interaction.options.getInteger('winners') || giveawayEdit.get('winnerCount'),
							interaction.options.getString('requirement1') || giveawayEdit.get('requirement1'),
							interaction.options.getString('requirement2') || giveawayEdit.get('requirement2'),
							interaction.options.getString('requirement3') || giveawayEdit.get('requirement3')
						]
						const giveawayEditEmbed = {
							color: Math.floor(Math.random() * Math.pow(16, 6)),
							title: 'Giveaway',
							description: `React with 🎉 to enter!\nHosted by: ${interaction.user.tag}\nRequirements: ${changeArray.slice(2).join(', ')}`,
							footer: {
								text: `Ends at <t:${giveawayEdit.get('endAtUnix')}:R>`
							}
						}
						const giveawayEditMessage = await client.channels.cache.get(giveawayEdit.get('channelID')).messages.fetch(giveawayEdit.get('messageID'))
						giveawayEditMessage.edit({ embeds: [giveawayEditEmbed] })
						giveawayEdit.update({
							prize: changeArray[0],
							winnerCount: changeArray[1],
							requirement1: changeArray[2],
							requirement2: changeArray[3],
							requirement3: changeArray[4]
						})
						break;
					case 'delete':
						break;
				}
			default:
				break;
		}
	} catch (err) {
		sendError(interaction, err, 'Main')
	}
});

mainClient.on('messageCreate', async (interaction) => {
	const { content, author, channel, guild } = interaction
	if (author.bot) return;
	// Command Area
	try {
		if (content.startsWith(prefix)) {
			const commandText = content.split(' ')
			commandText[0] = commandText[0].slice(prefix.length)
			switch (commandText[0]) {
			}
		}
		// const capitalCount = content.replace(/[^A-Z]/g, '').length
		// if (capitalCount / content.length >= 0.9) {
		// 	await channel.send(`Watch your volume please!`)
		// 	return;
		// }
		switch (content.toLowerCase()) {
			case 'slay':
			case 'slayy':
			case 'slayyy':
				Math.round(Math.random()) == 1 ?
					channel.send('Zombies!') :
					channel.send('Yassss Queen!')
				break;
			case 'testreport':
				undefinedReference()
				break;
			default:
				break;
		}
	} catch (err) {
		sendError(interaction, err, 'Main')
	}
})

assistantClient.on('interactionCreate', async (interaction) => {
	const { commandName } = interaction
	if (!interaction.isCommand()) return;
	try {
		switch (commandName) {
			// Current Commands: about, announce, ban, kick, mute
			case 'about':
				// TODO... Code
				break;
			case 'announce':
				const pingSelection = interaction.options.getBoolean('ping') ?? false
				break;
			case 'ban':
				// TODO... Code
				break;
			case 'kick':
				// TODO... Code
				break;
			case 'mute':
				// TODO... Code
				break;
			default:
				break
		}
	} catch (err) {
		sendError(interaction, err, 'Assistant')
	}
})

assistantClient.on('messageCreate', async (interaction) => {
	const { content, author, channel, guild } = interaction
	if (author.bot) return;
	try {
		if (content.toLowerCase().includes('bot invite')) {
			await channel.send(`You can invite the main bot into your server using this link: https://discord.com/api/oauth2/authorize?client_id=${mainClientID}&permissions=8&scope=bot%20applications.commands`)
		}
		if (content.match(regexList.swares)[0] !== null) {
			await channel.send(`Watch your language please!`)
			return;
		}
	} catch (err) {
		sendError(interaction, err, 'Assistant')
	}
})

mainClient.login(mainToken)
assistantClient.login(assistantToken)