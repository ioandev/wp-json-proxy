
import extractPosts from './posts'
import extractPopularPosts from './popularPosts'
import { config } from '../../config'

export default function extractBlog (input, website) {
    let options = config(website)
    let simplifiedPosts = extractPosts(input.posts, true, options)
    let simplifiedPages = extractPosts(input.pages, false, options)
    let simplifiedPopularPosts = extractPopularPosts(input.popularPosts)

    let simpliedPostAndPages = simplifiedPosts.concat(simplifiedPages)

    return {
        posts: simpliedPostAndPages,
        popularPosts: simplifiedPopularPosts,
        conversations: input.conversations
    }
}