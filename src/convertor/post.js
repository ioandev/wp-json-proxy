import { extractTitle, extractThumbnails, extractContent, extractLink, extractAuthors, extractMeta, extractReadingTime } from '../blocks'

export default function extractPost(post, isPost, contentOptions, metaOptions, authorNameLinkMappings) {
    var featuredMedia = post._embedded['wp:featuredmedia'];
    var authors = post._embedded['author'];

    let thumbnails = [];
    if (featuredMedia) {
        try{
            thumbnails = extractThumbnails(featuredMedia, post);
        }
        catch(ex) {
            console.error(`Error while parsing thumbnails: ${ex}`)
        }
    }
    
    const { title, tags } = extractTitle(post);
    let meta = []
    if (metaOptions !== undefined) {
        meta = extractMeta(post, metaOptions)
    }

    let readingTime = extractReadingTime(post.content.rendered)
    let result = {
        title,
        html: post.content.rendered,
        slug: post.slug,
        thumbnails: thumbnails,
        created_at: post.date_gmt,
        isPost: isPost,
        excerpt: post.excerpt.rendered,
        link: extractLink(post.link),
        authors: extractAuthors(authors, authorNameLinkMappings),
        tags,
        meta,
        reading_time: readingTime
    };
    result.json = extractContent(post.content.rendered, contentOptions, result);

    return result
}