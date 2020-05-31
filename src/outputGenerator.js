import popularPostsConvertor from './popularPostsConvertor'
import contentConvertor from './contentConvertor'
var axios = require('axios')
axios.defaults.timeout = 1000

// Note: this name might cause issues
async function fetch(url) {
    try {
        return (await axios(url)).data
    } catch (ex) {
        throw `An error has occured when trying to fetch URL ${url}: ${ex}`
    }
}

async function fetchWordpressContent() {
    let hostname = process.env.HOSTNAME
    if (hostname == undefined) {
        throw "hostname env variable could not be found"
    }
    
    return {
        posts: await fetch(`${hostname}/wp-json/wp/v2/posts?page=1&per_page=100&_embed=1`),
        pages: await fetch(`${hostname}/wp-json/wp/v2/pages?page=1&per_page=100&_embed=1`),
        popularPosts: await fetch(`${hostname}/wp-json/wordpress-popular-posts/v1/popular-posts?post_type=post&limit=30&range=all`),
    }
}

async function generateOutput() {
    let output = await fetchWordpressContent()
    let simplifiedPosts = contentConvertor(output.posts, true)
    let simplifiedPages = contentConvertor(output.pages, false)
    let simplifiedPopularPosts = popularPostsConvertor(output.popularPosts)

    let simpliedPostAndPages = simplifiedPosts.concat(simplifiedPages)

    return {
        posts: simpliedPostAndPages,
        popularPosts: simplifiedPopularPosts
    }
}

export default generateOutput