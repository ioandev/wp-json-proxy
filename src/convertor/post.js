import { extractTitle, extractThumbnails, extractContentAsJson, extractContentAsText , extractLink, extractAuthors, extractMeta, extractReadingTime, extractExcerpt, extractDates } from '../blocks'
var wordcount = require('wordcount');

export default function extractPost(post, isPost, contentOptions, metaOptions, authorNameLinkMappings, baseUrl) {
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

    let excerpts = extractExcerpt(post.excerpt)
    let dates = extractDates(post.date_gmt)

    let readingTime = extractReadingTime(post.content.rendered)

    let result = {
        title,
        html: post.content.rendered,
        slug: post.slug,
        thumbnails: thumbnails,
        isPost: isPost,
        excerpt: post.excerpt.rendered,
        link: baseUrl + "/" + post.slug,
        link_regular: extractLink(post.link),
        authors: extractAuthors(authors, authorNameLinkMappings),
        tags,
        meta,
        reading_time: readingTime,
    };
    result.json = extractContentAsJson(post.content.rendered, contentOptions, result);
    result.txt = extractContentAsText(post.content.rendered);
    result.word_count = wordcount(result.txt.replace("\n", ""))

    result = {...result, ...excerpts, ...dates}
    return result
}