
import { extractAuthors } from "~/src/blocks"

describe('author block', () => {
    it('works', () => {
        const input = require('./static/author/input1').authors
        const output = require('./static/author/output1').authors

        const actual = extractAuthors(input)
        expect(actual).toEqual(output)
    })
    
    it('works', () => {
        const input = require('./static/author/input1').authors
        const output = require('./static/author/output1').authors

        const actual = extractAuthors(input)
        expect(actual).toEqual(output)
    })

    it('works by mapping names as well', () => {
        const input = require('./static/author/input2')
        const { authors, authorNameLinkMappings } = input

        const output = require('./static/author/output2').authors
        const actual = extractAuthors(authors, authorNameLinkMappings)
        expect(actual).toEqual(output)
    })
})