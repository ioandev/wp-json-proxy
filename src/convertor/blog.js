
import extractPosts from './posts'
import extractPopularPosts from './popularPosts'

export default function extractBlog (input, contentOptions, metaOptions) {
    let simplifiedPosts = extractPosts(input.posts, true, contentOptions, metaOptions)
    let simplifiedPages = extractPosts(input.pages, false, contentOptions, metaOptions)
    let simplifiedPopularPosts = extractPopularPosts(input.popularPosts)

    let simpliedPostAndPages = simplifiedPosts.concat(simplifiedPages)

    return {
        posts: simpliedPostAndPages,
        popularPosts: simplifiedPopularPosts,
        conversations: input.conversations
    }
}