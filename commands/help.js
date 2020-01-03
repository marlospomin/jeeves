const { prefix } = require('../config.json')

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  cooldown: 1,
  execute (message, args) {
    const data = []
    const { commands } = message.client

    if (!args.length) {
      data.push('Here\'s a list of all my commands:')
      data.push(commands.map(command => command.name).join(', '))

      return message.author.send(data)
    }

    const name = args[0].toLowerCase()
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

    if (!command) {
      return message.reply('That\'s not a valid command!')
    }

    data.push(`Name: ${command.name}`)

    if (command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}`)
    if (command.description) data.push(`Description: ${command.description}`)
    if (command.usage) data.push(`Usage: ${prefix}${command.name} ${command.usage}`)

    message.author.send(data)
  }
}
