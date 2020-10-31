

import extractPopularPost from './popularPost'

export default function extractPopularPosts(data) {
    return data.map(post => {
        return extractPopularPost(post);
    })
}