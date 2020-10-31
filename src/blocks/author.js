
export default function extractAuthors(authors) {
    return authors.map(a => {
        return {
            name: a.name,
            avatars: a.avatar_urls
        }
    })
}