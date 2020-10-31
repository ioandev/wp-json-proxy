import decoder from '~/src/helpers/decoder'
const htmlToText = require('html-to-text');

export default function extractExcerpt(excerpt) {
    const html = excerpt.rendered
    const txt = 
        htmlToText.fromString(
            decoder(html))
    
    return {
        "excerpt_html": html,
        "excerpt_txt": txt
    }
}