const mysql = require('mysql')
const crypto = require('crypto')
const { mysqlHost, mysqlUser, mysqlPassword } = require('../config.json')

const connection = mysql.createConnection(`mysql://${mysqlUser}:${mysqlPassword}@${mysqlHost}/acore_auth`)

module.exports = {
  name: 'join',
  description: 'Command used to create an account into the world server.',
  aliases: ['signup', 'register', 'login'],
  usage: '<usernane> <password> <email>',
  cooldown: 30,
  execute (message, args) {
    if (!args.length) return message.reply('Missing arguments, type `!help join` for more info.')

    const username = args[0]
    const password = args[1]
    const email = args[2]

    if (!username || !password || !email) return
    if (username.length <= 3) return
    if (password.length <= 6) return
    if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) return

    const toPassword = (username, password) => {
      const hash = crypto.createHash('sha1')
      const data = hash.update(`${username.toUpperCase()}:${password.toUpperCase()}`, 'utf-8')
      return data.digest('hex').toUpperCase()
    }

    connection.query('insert into account (username, sha_pass_hash, email) values (?, ?, ?)', [username, toPassword(username, password), email], (error, results, fields) => {
      if (error) {
        return message.reply('Syntax error, please check your input arguments. Username must be at least 3 chars, password lenght should be greater than 5 and you must supply a valid email.')
      } else { message.reply('Account created, you may login now.') }
    })
  }
}
