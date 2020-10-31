import extractPost from './post'

export default function extractPosts(data, isPost, contentOptions, metaOptions, authorNameLinkMappings) {
    return data.map(post => {
        return extractPost(post, isPost, contentOptions, metaOptions, authorNameLinkMappings);
    })
}