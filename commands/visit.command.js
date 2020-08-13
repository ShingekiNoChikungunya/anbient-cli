const {visit, format} = require('../modules/visit.module')

module.exports = {
    command: 'visit <path>',
    aliases: ['v'],
    desc: 'Visits a given anime page',
    builder: {},
    handler: async (argv) => {
        const page = await visit(argv.path)
        console.log(format(page))
    }
}
