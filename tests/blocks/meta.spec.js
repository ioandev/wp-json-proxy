
import { extractMeta } from "~/src/blocks"

describe('meta block', () => {
    it('works', () => {
        const inputPost = {
            for: "Developers",
            subtitle: "whatever",
            id: 2
        }
        const meta = {
            for: "Developers",
            subtitle: "whatever",
        }
        const actual = extractMeta(inputPost, ["for", "subtitle"])
        expect(actual).toEqual(meta)
    })
    it("doesn't throw if it can't one of the fields", () => {
        const inputPost = {
            for: "Developers",
            id: 2
        }
        const meta = {
            for: "Developers",
        }
        const actual = extractMeta(inputPost, ["for", "subtitle"])
        expect(actual).toEqual(meta)
    })
})