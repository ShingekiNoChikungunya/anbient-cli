module.exports = {
    command: 'search <term..>',
    aliases: ['s'],
    desc: 'Searches for the term and returns the results',
    builder: {},
    handler: (argv) => {
        console.log(`Term: ${[...argv.term].join(' ')}`)
    }
}