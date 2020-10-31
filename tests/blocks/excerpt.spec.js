
import { extractExcerpt } from "~/src/blocks"

describe('meta block', () => {
    it('works 2', () => {
        const actual = extractExcerpt({
            rendered: "Some title"
        })
        expect(actual.excerpt_txt).toStrictEqual("Some title")
    })
    it('works', () => {
        const actual = extractExcerpt({
            rendered: "<p>Some title</p>\n\n\n"
        })
        expect(actual.excerpt_txt).toStrictEqual("Some title")
    })
})