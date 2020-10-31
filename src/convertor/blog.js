
import extractPosts from './posts'
import extractPopularPosts from './popularPosts'

export default function extractBlog (input, contentOptions) {
    let simplifiedPosts = extractPosts(input.posts, true, contentOptions)
    let simplifiedPages = extractPosts(input.pages, false, contentOptions)
    let simplifiedPopularPosts = extractPopularPosts(input.popularPosts)

    let simpliedPostAndPages = simplifiedPosts.concat(simplifiedPages)

    return {
        posts: simpliedPostAndPages,
        popularPosts: simplifiedPopularPosts,
        conversations: input.conversations
    }
}