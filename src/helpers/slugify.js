export default function (text) {
    return text.toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'').replace(/^\d*[\s.-_]\-/g, '')
}