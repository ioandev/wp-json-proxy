export const websites = ["nextview", "ioanblog"]

export function config(website) {
    if (website == "nextview") {
        return {
            hostname: "https://ioan.blog",
        }
    }
    if (website == "ioanblog") {
        return {
            hostname: "https://ioan.blog",
            hostnameConversations: "http://localhost:54440"
        }
    }
    throw {
        "error": `Website ${website} not found.`
    }
}