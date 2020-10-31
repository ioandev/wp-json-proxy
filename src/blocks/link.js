const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

export default function extractLink(link) {
    return entities.decode(link)
}