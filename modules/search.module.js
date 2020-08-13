const got = require('got')
const cheerio = require('cheerio')
const {base_url} = require('../config')
const colors = require('colors')
const readline = require("readline")

const search = async (term) => {
    const response = await got(`${base_url}/search?search_api_views_fulltext=${term}`)
    const $ = cheerio.load(response.body)

    const result = []

    $('div#search').children().each((index, element) => {
        const article = $(element).find('article')
        const name_element = article.find('header').find('h2').find('a')
        const content = article.find('.content')
        const genres = []
        content.find('.field-generos')
            .each((i, genre) => genres.push($(genre).find('a').text().trim()))

        result.push({
            name: name_element.text().trim(),
            path: name_element.attr().href,
            genres: genres,
            description: content.find('.field-body').find('.item').text().trim(),
            type: content.find('.field-tipo-de-anime').find('.item').find('a').text().trim(),
            num_eps: content.find('.field-num-episodios')
                .find('.field-items').find('.field-item').find('span').text().trim(),
            score: content.find('.field-nota').find('.item').text().trim()
        })
    })

    return result
}

const format = (result) => {
    const out = []
    result.forEach((anime, index) => {
        const formated_string = [
            `[${index}] `.green + `${anime.name.green}\t(${anime.genres.join(', ').blue})\tScore: ${anime.score.blue}`,
            `[${anime.path.blue.underline}]`,
            (anime.description.slice(0, 100) + '...'),
            `Type: ${anime.type.blue}\tNumber of episodes: ${anime.num_eps.blue}`
        ].join('\n')
        out.push(formated_string)
    })
    return out.join('\n\n\n')
}

module.exports = {
    search,
    format,
}
