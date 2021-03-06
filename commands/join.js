require('dotenv').config()
const mysql = require('mysql')
const crypto = require('crypto')

const connection = mysql.createConnection(`mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}/acore_auth`)

module.exports = {
  name: 'join',
  description: 'Command used to create an account into the world server.',
  aliases: ['signup', 'register', 'login'],
  usage: '<usernane> <password>',
  cooldown: 30,
  execute (message, args) {
    if (!args.length) return message.reply('Missing arguments, type `!help join` for more info.')

    const username = args[0]
    const password = args[1]

    if (!username || !password) return
    if (username.length <= 3) return
    if (password.length <= 6) return

    const toPassword = (username, password) => {
      const hash = crypto.createHash('sha1')
      const data = hash.update(`${username.toUpperCase()}:${password.toUpperCase()}`, 'utf-8')
      return data.digest('hex').toUpperCase()
    }

    connection.query('select exists(select id from account where reg_mail = ?)', [message.author.id], (error, results, fields) => {
      if (error) return message.reply('An error occured.')

      if (Object.values(results[0])[0] === 0) {
        connection.query('insert into account (username, sha_pass_hash, reg_mail) values (?, ?, ?)', [username, toPassword(username, password), message.author.id], (error, results, fields) => {
          if (error) {
            return message.reply('Syntax error, please check your input arguments. Username must be at least 3 chars and password length should be greater than 5.')
          } else { message.reply('Account created, you may login now.') }
        })
      } else {
        message.reply('You already have an account!')
      }
    })
  }
}
