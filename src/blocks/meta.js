
export default function extractMeta(post, fields) {
    let result = {}

    for (const field of fields) {
        if (post[field] === undefined) {
            console.error(`Couldn't find field ${field} in post ${post.id}`)
        } else {
            result[field] = post[field]
        }
    }

    return result
}