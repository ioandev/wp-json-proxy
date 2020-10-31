export const websites = ["nextview", "ioanblog"]

export function config(website) {
    if (website == "nextview") {
        return {
            hostname: "https://blog-internal.nextview.dev",
            contentOptions: {
                addThumbnailBeforeFirstTitle: true
            },
            authorNameLinkMappings: {
                "admin": "https://ioan.blog/",
                "ioanbiticu": "https://ioan.blog/"
            },
            metaOptions: ["excerpt_small", "for", "subtitle", "alt_headline", "keywords"],
            baseUrl: "https://nextview.dev/blog"
        }
    }
    if (website == "ioanblog") {
        return {
            hostname: "https://ioan.blog",
            hostnameConversations: "http://localhost:54440",
            baseUrl: "https://ioan.blog"
        }
    }
    throw {
        "error": `Website ${website} not found.`
    }
}