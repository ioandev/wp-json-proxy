
import extractPosts from './posts'
import extractPopularPosts from './popularPosts'

export default function extractBlog (input, contentOptions, metaOptions, authorNameLinkMappings, baseUrl) {
    let simplifiedPosts = extractPosts(input.posts, true, contentOptions, metaOptions, authorNameLinkMappings, baseUrl)
    let simplifiedPages = extractPosts(input.pages, false, contentOptions, metaOptions, authorNameLinkMappings, baseUrl)
    let simplifiedPopularPosts = extractPopularPosts(input.popularPosts)

    let simpliedPostAndPages = simplifiedPosts.concat(simplifiedPages)

    return {
        posts: simpliedPostAndPages,
        popularPosts: simplifiedPopularPosts,
        conversations: input.conversations
    }
}