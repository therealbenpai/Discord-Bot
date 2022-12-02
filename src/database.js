const {
    Sequelize,
    STRING,
    INTEGER,
    BOOLEAN
} = require('sequelize')

const sequelize = new Sequelize('giveaway', 'root', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
})

const Giveaways = sequelize.define('giveaways', {
    giveawayID: {
        type: STRING,
        unique: true
    },
    messageID: {
        type: STRING,
        unique: true
    },
    channelID: STRING,
    guildID: STRING,
    startAt: INTEGER,
    endAt: INTEGER,
    endAtUnix: INTEGER,
    ended: BOOLEAN,
    winnerCount: INTEGER,
    prize: STRING,
    requirement1: {
        type: STRING,
        allowNull: true
    },
    requirement2: {
        type: STRING,
        allowNull: true
    },
    requirement3: {
        type: STRING,
        allowNull: true
    },
    hostedBy: STRING
})

module.exports = {
    Giveaways
}
