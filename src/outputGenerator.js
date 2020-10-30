import popularPostsConvertor from './popularPostsConvertor'
import contentConvertor from './contentConvertor'
var axios = require('axios')
axios.defaults.timeout = 1000
import { config, websites } from '../config'

// Note: this name might cause issues
async function fetch(url) {
    try {
        return (await axios(url)).data
    } catch (ex) {
        //throw `An error has occured when trying to fetch URL ${url}: ${ex}`
        return []
    }
}

async function fetchWordpressContent(website) {
    let configThis = config(website)

    let hostname = configThis.hostname
    if (hostname == undefined) {
        throw "hostname env variable could not be found"
    }

    let result = {}

    let hostnameConversations = configThis.hostnameConversations
    if (hostnameConversations == undefined) {
        result.conversations = await fetch(`${hostnameConversations}/Pipeline`)
    }

    return Object.assign({}, result, {
        posts: await fetch(`${hostname}/wp-json/wp/v2/posts?page=1&per_page=100&_embed=1`),
        pages: await fetch(`${hostname}/wp-json/wp/v2/pages?page=1&per_page=100&_embed=1`),
        popularPosts: await fetch(`${hostname}/wp-json/wordpress-popular-posts/v1/popular-posts?post_type=post&limit=30&range=all`),
    })
}

function generateOutput(website) {
    return async function () {
        let output = await fetchWordpressContent(website)
        let simplifiedPosts = contentConvertor(output.posts, true)
        let simplifiedPages = contentConvertor(output.pages, false)
        let simplifiedPopularPosts = popularPostsConvertor(output.popularPosts)

        let simpliedPostAndPages = simplifiedPosts.concat(simplifiedPages)

        return {
            posts: simpliedPostAndPages,
            popularPosts: simplifiedPopularPosts,
            conversations: output.conversations
        }
    }
}

export default generateOutput