
import { extractThumbnails } from "~/src/blocks"

describe('thumbnail block', () => {
    it('works as before', () => {
        const input = require('./static/thumbnail/input1').featuredMedia
        const output = require('./static/thumbnail/output1').featuredMedia

        const actual = extractThumbnails(input)
        expect(actual).toEqual(output)
    })

    it('works without plugin', () => {
        const input = require('./static/thumbnail/input2').featuredMedia
        const output = require('./static/thumbnail/output2').featuredMedia

        const actual = extractThumbnails(input)
        expect(actual).toEqual(output)
    })

    it('replaces previous base url', () => {
        const input = require('./static/thumbnail/input3').featuredMedia
        const output = require('./static/thumbnail/output3').featuredMedia

        const actual = extractThumbnails(input, {
            hostname: "https://blog-internal.nextview.dev",
            baseUrl: "https://nextview.dev/blog"
        })
        expect(actual).toEqual(output)
    })
})