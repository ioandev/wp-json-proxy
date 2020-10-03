const htmlToText = require('html-to-text');

function popularPostsConvertor(data) {
    return data.map(post => {
        
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
    })
}

export default popularPostsConvertor;