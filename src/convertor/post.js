import { extractTitle, extractThumbnails, extractContent, extractLink, extractAuthors } from '../blocks'

export default function extractPost(post, isPost, contentOptions) {
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
    
    let { title, tags } = extractTitle(post);
    
    let result = {
        title,
        html: post.content.rendered,
        slug: post.slug,
        thumbnails: thumbnails,
        created_at: post.date_gmt,
        isPost: isPost,
        excerpt: post.excerpt.rendered,
        link: extractLink(post.link),
        authors: extractAuthors(authors),
        tags
    };
    result.json = extractContent(post.content.rendered, contentOptions, result);

    return result
}