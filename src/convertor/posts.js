import extractPost from './post'

export default function extractPosts(data, isPost, contentOptions, metaOptions, authorNameLinkMappings, baseUrl) {
    return data.map(post => {
        return extractPost(post, isPost, contentOptions, metaOptions, authorNameLinkMappings, baseUrl);
    })
}