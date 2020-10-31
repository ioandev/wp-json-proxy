const {
    DomHandler
} = require("domhandler");
//const cheerio = require('cheerio')
const {
    Parser
} = require("htmlparser2");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

import { getLargest } from './thumbnail'
import slugify from '../helpers/slugify'

function postProcess(parent, options, post) {
    if (parent.data == undefined && parent.name == undefined)
        return null;

    if (parent.data != undefined && parent.data.trim() == "")
        return null;

    var children = []
    if (parent.children != undefined) {
        let didInsertThumbnailBeforeH2 = false
        for (const child of parent.children) {
            if (child.name == 'h2') {
                let largest = post && getLargest(post.thumbnails)
                if (options && options.addThumbnailBeforeFirstTitle && largest && !didInsertThumbnailBeforeH2) {
                    children.push({
                        name: 'img',
                        attribs: {
                            src: largest.url,
                            alt: post.thumbnails[0].alt_text
                        }
                    })
                    didInsertThumbnailBeforeH2 = true
                }
            }
            
            children.push(postProcess(child, options, post))
        }
    }
    if (parent.type == "tag" && parent.children != undefined && parent.children.length == 1 && parent.children[0].type != "tag") {
        children = []
        parent.data = parent.children[0].data
    }

    var result = {
        name: parent.name,
        data: parent.data
    }
    if (result.data != undefined) {
        result.data = entities.decode(result.data)
    }

    children = children.filter(child => child != null)

    if (children.length != 0) {
        result.children = children
    }

    if (parent.attribs != undefined && Object.keys(parent.attribs).length != 0) {
        result.attribs = parent.attribs
    }

    if (result.name == "h2") {
        let slug = slugify(result.data);
        result.attribs = {id: slug, ...result.attribs}
    }

    return result
}

export default function extractContent(rawHtml, options, post) {
    let result = "";

    const handler = new DomHandler(function (error, dom) {
        if (error) {
            // Handle error
        } else {
            // Parsing completed, do something
            if (process.env.DEBUG) {
                //console.log(dom);
            }
            result = postProcess({
                name: 'main',
                type: 'main',
                children: dom
            }, options, post);
            if (process.env.DEBUG) {
                //console.log(content);
            }
        }
    });

    const parser = new Parser(handler);
    parser.write(rawHtml);
    parser.end();
    return result;
}