const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

export default function(text) {
    return entities.decode(text.replace('&nbsp;', ' '))
}