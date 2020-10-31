
import slugify from "~/src/helpers/slugify"

describe('slugify helper', () => {
    it('works', () => {
        expect(slugify('A piece of text')).toStrictEqual("a-piece-of-text")
        expect(slugify('1. A piece of text')).toStrictEqual("a-piece-of-text")
        expect(slugify('1- A piece of text')).toStrictEqual("a-piece-of-text")
    })
})