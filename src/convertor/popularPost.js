const htmlToText = require('html-to-text');

export default function extractPopularPost(post) {
    let title = htmlToText.fromString(post.title.rendered);

    if (title.indexOf("#") != 0) {
        let hashtags = title.split("#")
        title = hashtags[0].trim()
    }
    
    return {
        title,
        slug: post.slug,
        pageviews: post.pageviews
    }
}