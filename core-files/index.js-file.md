---
description: Details for the index.js file
---

# Index.js File

File name: `index.js`

File Location: [index.js](../index.js)

File Description: This file is the main processing part of the bot. It houses the bot presence, command responses, error handling, and more. This file is absolutely required for the bot to function.

Core Code Points:

{% code title="index.js (at line 3)" lineNumbers="true" %}
```javascript
//? Requiring packages
const {
	Client,
	DiscordAPIError,
	DiscordjsError,
	DiscordjsTypeError,
	Message,
	ChatInputCommandInteraction
} = require(`discord.js`);
require("dotenv").config();
//// This is optional packages used for error reporting
const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");
const Intigrations = require("@sentry/integrations");
const uuid = require("uuid")

//? Envirmental Varibles
const { prefix, namespace_uuid } = require(`./config-files/config.json`);
const {
	MAIN_TOKEN: mainToken,
	MAIN_CLIENT_ID: mainClientID,
	MAIN_CLIENT_SECRET: mainClientSecret,
	ASSISTANT_TOKEN: assistantToken,
	ASSISTANT_CLIENT_ID: assistantClientID,
	ASSISTANT_CLIENT_SECRET: assistantClientSecret
} = process.env;
```
{% endcode %}

{% code title="index.js (at line 75)" lineNumbers="true" %}
```javascript
// Bot Setup
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
```
{% endcode %}

{% code title="index.js (at line 153)" lineNumbers="true" %}
```javascript
// Command controller
mainClient.on(`interactionCreate`, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	//...
})
```
{% endcode %}

<pre class="language-javascript" data-title="index.js (at line 400)" data-line-numbers><code class="lang-javascript"><strong>// Message Response controller
</strong><strong>mainClient.on('messageCreate', async (interaction) => {
</strong>	const { content, author, channel, guild } = interaction
	if (author.bot) return;
})
</code></pre>

{% code title="index.js (at line 490)" lineNumbers="true" %}
```javascript
// Bot signin function
mainClient.login(mainToken)
```
{% endcode %}
