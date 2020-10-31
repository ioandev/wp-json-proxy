
export default function extractAuthors(authors, authorNameLinkMappings) {
    return authors.map(a => {
        let result = {
            name: a.name,
            avatars: a.avatar_urls
        }
        if (authorNameLinkMappings) {
            if (a.slug in authorNameLinkMappings) {
                result.link = authorNameLinkMappings[a.slug]
            } else {
                result.link = "/"
            }
        }
        return result
    })
}