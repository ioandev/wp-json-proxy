import extractPost from './post'

export default function extractPosts(data, isPost, options) {
    return data.map(post => {
        return extractPost(post, isPost, options);
    })
}