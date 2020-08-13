const got = require('got')
const cheerio = require('cheerio')
const {base_url} = require('../config')
const colors = require('colors')

const visit = async (path) => {
    const response = await got(`${base_url}${path}`)
    const $ = cheerio.load(response.body)
    const link = Buffer.from($('.ajax.padrao').attr().href, 'base64').toString('utf8')
    const response2 = await got(`${base_url}${link}`)
    const $2 = cheerio.load(response2.body)
    const eps = []

    $2('div.servidores-wrapper').find('div.servidor.zippyshare')
    .find('li').each((index, element) =>
        eps.push({href: $(element).find('a').attr().href, ep: $(element).find('a').text().trim()})
    )

    return {
        title: $('h1#page-title').text().trim(),
        first_date: $('.field.field-estreia').find('.item').text().trim(),
        num_episodes: $('.field.field-num-episodios').find('.field-items')
            .find('.field-item').find('span').text().trim(),
        score: $('div#rating').find('div.value').find('.field.field-nota')
            .find('.item').text().trim(),
        synopsis: $('.field.field-body').find('div.item').text().trim(),
        eps: eps
    }
}

const format = (page) => {
    const eps_to_download = []
    page.eps.forEach((ep, index) => eps_to_download.push(ep.ep))
    const formated_string = [
        `${page.title.green}\n`,
        `First Date: ${page.first_date.blue}\tNumber of Episodes: ${page.num_episodes.blue}\t Score: ${page.score.blue}\n`,
        `Synopsis`.blue,
        page.synopsis,
        `\nEpisodes to Download: ${eps_to_download.join(', ')}`.blue
    ].join('\n')
    return formated_string
}

module.exports = {
    visit,
    format
}
