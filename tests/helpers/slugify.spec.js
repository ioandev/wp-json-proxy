
import slugify from "~/src/helpers/slugify"

describe('slugify helper', () => {
    it('works', () => {
        expect(slugify('A piece of text')).toStrictEqual("a-piece-of-text")
        expect(slugify('1. A piece of text')).toStrictEqual("a-piece-of-text")
        expect(slugify('1- A piece of text')).toStrictEqual("a-piece-of-text")
        expect(slugify('Step 2: Test if the')).toStrictEqual("step-2-test-if-the")
        expect(slugify('minedive.com')).toStrictEqual("minedive-com")
    })
})