const {search, format} = require('../modules/search.module')

module.exports = {
    command: 'search <term..>',
    aliases: ['s'],
    desc: 'Searches for the term and returns the results',
    builder: {},
    handler: async (argv) => {
        const result = await search([...argv.term].join(' '))
        console.log(format(result))
    }
}
