export const websites = ["nextview", "ioanblog"]

export function config(website) {
    let result = {}
    if (website == "nextview") {
        result = {
            hostname: "https://blog-internal.nextview.dev",
            contentOptions: {
                addThumbnailBeforeFirstTitle: true
            },
            authorNameLinkMappings: {
                "admin": "https://ioan.blog/",
                "ioanbiticu": "https://ioan.blog/"
            },
            metaOptions: ["excerpt_small", "for", "subtitle", "alt_headline", "keywords"],
            baseUrl: "http://local-nginx/blog"
        }
    }
    if (website == "ioanblog") {
        result = {
            hostname: "https://ioan.blog",
            hostnameConversations: "http://localhost:54440",
            baseUrl: "https://ioan.blog"
        }
    }

    if(Object.keys(result).length == 0) {
        throw {
            "error": `Website ${website} not found.`
        }
    }

    let hostnameAndBaseUrlPack = {
        hostname: result.hostname,
        baseUrl: result.baseUrl
    };

    result.thumbnailOptions = {...hostnameAndBaseUrlPack}
    result.contentOptions = {...result.contentOptions, ...hostnameAndBaseUrlPack}

    return result;
}