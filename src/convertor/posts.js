import extractPost from './post'

export default function extractPosts(data, isPost, contentOptions, metaOptions) {
    return data.map(post => {
        return extractPost(post, isPost, contentOptions, metaOptions);
    })
}