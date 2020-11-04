var axios = require('axios')
axios.defaults.timeout = 1000
import { config } from '../../config'

// Note: this name might cause issues
async function fetch(url) {
    try {
        return (await axios(url)).data
    } catch (ex) {
        throw `An error has occured when trying to fetch URL ${url}: ${ex}`
    }
}

async function fetchAndAdd(result, website, id, url) {
    try {
        result[id] = await fetch(url)
    } catch (ex) {
        console.error(`An error has occured when fetching resource ${id} for website ${website}: ${ex}`)
        result[id] = []
    }
}

export default async function fetchBlog(website) {
    let configThis = config(website)

    let hostname = configThis.hostname
    if (hostname == undefined) {
        throw "hostname env variable could not be found"
    }

    let result = {}
    if (configThis.hostnameConversations != undefined) {
        await fetchAndAdd(result, website, "conversations", `${configThis.hostnameConversations}/Pipeline`)
    }
    await fetchAndAdd(result, website, "posts", `${hostname}/wp-json/wp/v2/posts?page=1&per_page=100&_embed=1`)
    await fetchAndAdd(result, website, "pages", `${hostname}/wp-json/wp/v2/pages?page=1&per_page=100&_embed=1`)
    await fetchAndAdd(result, website, "popularPosts", `${hostname}/wp-json/wordpress-popular-posts/v1/popular-posts?post_type=post&limit=30&range=all`)
    return result
}