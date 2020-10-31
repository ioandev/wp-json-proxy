const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const htmlToText = require('html-to-text');

export default function extractExcerpt(excerpt) {
    const html = excerpt.rendered
    const txt = 
        htmlToText.fromString(
            entities
            .decode(html))
    
    return {
        "excerpt_html": html,
        "excerpt_txt": txt
    }
}