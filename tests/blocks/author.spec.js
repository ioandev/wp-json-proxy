
import { extractAuthors } from "~/src/blocks"

describe('author block', () => {
    it('works', () => {
        const input = require('./static/author/input1').authors
        const output = require('./static/author/output1').authors

        const actual = extractAuthors(input)
        expect(actual).toEqual(output)
    })
})