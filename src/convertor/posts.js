import extractPost from './post'

export default function extractPosts(data, isPost, contentOptions) {
    return data.map(post => {
        return extractPost(post, isPost, contentOptions);
    })
}