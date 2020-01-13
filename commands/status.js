const mysql = require('mysql')
const { mysqlHost, mysqlUser, mysqlPassword } = require('../config.json')

const connection = mysql.createConnection(`mysql://${mysqlUser}:${mysqlPassword}@${mysqlHost}/acore_auth`)

module.exports = {
  name: 'status',
  aliases: ['stats', 'info'],
  description: 'Retrieves the worldserver status and number of players online.',
  cooldown: 5,
  execute (message, args) {
    connection.query('select count(online) from account where online = 1', (error, results, fields) => {
      if (error) return message.reply('An error occured.')
      message.reply(`Players online: ${Object.values(results[0])[0]}`)
    })
  }
}
