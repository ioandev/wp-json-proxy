
import extractPosts from './posts'
import extractPopularPosts from './popularPosts'

export default function extractBlog (input, contentOptions, metaOptions, authorNameLinkMappings) {
    let simplifiedPosts = extractPosts(input.posts, true, contentOptions, metaOptions, authorNameLinkMappings)
    let simplifiedPages = extractPosts(input.pages, false, contentOptions, metaOptions, authorNameLinkMappings)
    let simplifiedPopularPosts = extractPopularPosts(input.popularPosts)

    let simpliedPostAndPages = simplifiedPosts.concat(simplifiedPages)

    return {
        posts: simpliedPostAndPages,
        popularPosts: simplifiedPopularPosts,
        conversations: input.conversations
    }
}