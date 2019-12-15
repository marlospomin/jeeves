const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

// Add commands here

client.login(config.token)
