
import { extractContentAsJson, extractContentAsText } from "~/src/blocks"

describe('content as json block', () => {
    it('works as before', () => {
        const inputHtml = "\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n\n\n\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n\n\n\n<h2>1. Some title here</h2>\n\n\n\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n\n\n\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n"

        const actual = extractContentAsJson(inputHtml, {
            addThumbnailBeforeFirstTitle: false
        })
        expect(actual).toEqual({
            name: 'main',
            data: undefined,
            children: [
                {
                    name: 'p',
                    data: 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!'
                },
                {
                    name: 'p',
                    data: 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!'
                },
                { name: 'h2', data: '1. Some title here', attribs: {id: 'some-title-here'} },
                {
                    name: 'p',
                    data: 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!'
                },
                {
                    name: 'p',
                    data: 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!'
                }
            ]
        })
    })
    it('works as before with image', () => {
        const inputHtml = "\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n\n\n\n<img src=\"https://images.com/image.jpg\" alt=\"some image\"/>\n\n\n\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n\n\n\n<h2>1. Some title here</h2>\n\n\n\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n\n\n\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n"

        const actual = extractContentAsJson(inputHtml, {
            addThumbnailBeforeFirstTitle: false
        })
        expect(actual).toEqual({
            name: 'main',
            data: undefined,
            children: [
                {
                    name: 'p',
                    data: 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!'
                },
                {
                    name: 'img',
                    data: undefined,
                    attribs: {
                        src: 'https://images.com/image.jpg',
                        alt: "some image"
                    }
                },
                {
                    name: 'p',
                    data: 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!'
                },
                { name: 'h2', data: '1. Some title here', attribs: {id: 'some-title-here'} },
                {
                    name: 'p',
                    data: 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!'
                },
                {
                    name: 'p',
                    data: 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!'
                }
            ]
        })
    })

    it('addThumbnailBeforeFirstTitle option', () => {
        const inputHtml = "\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n\n\n\n<h2>1. Some title here</h2>\n\n\n\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p><h2>2. Another title</h2>\n"

        const actual = extractContentAsJson(
            inputHtml,
            {
                addThumbnailBeforeFirstTitle: true,
            }, {
            thumbnails: [
                {
                    "caption": "<p>Vue popularity</p>\n",
                    "alt_text": "Vue popularity",
                    "details": {
                        "thumbnail": {
                            "url": "https://ioan.blog/wp-content/uploads/2020/06/whyvue-150x150.png",
                            "width": 150
                        },
                        "medium": {
                            "url": "https://ioan.blog/wp-content/uploads/2020/06/whyvue-300x140.png",
                            "width": 300
                        },
                        "medium_large": {
                            "url": "https://ioan.blog/wp-content/uploads/2020/06/whyvue-768x359.png",
                            "width": 768
                        },
                        "full": {
                            "url": "https://ioan.blog/wp-content/uploads/2020/06/whyvue.png",
                            "width": 1022
                        }
                    }
                }
            ]
        })
        expect(actual).toEqual({
            name: 'main',
            data: undefined,
            children: [
                {
                    name: 'p',
                    data: 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!'
                },
                {
                    name: 'img',
                    attribs: {
                        src: 'https://ioan.blog/wp-content/uploads/2020/06/whyvue.png',
                        alt: "Vue popularity"
                    }
                },
                {
                    name: 'h2',
                    data: '1. Some title here',
                    attribs: {
                        id: 'some-title-here',
                    }
                },
                {
                    name: 'p',
                    data: 'Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing! Welcome to WordPress. This is your first post. Edit or delete it, then start writing!'
                },
                {
                    name: 'h2',
                    data: '2. Another title',
                    attribs: {
                        id: 'another-title',
                    }
                },
            ]
        })
    })
})

describe('content as txt block', () => {
    it('works as before', () => {
        const inputHtml = "\n<p>Welcome to WordPress. This is your first post.</p><h2>Hi</h2><p>testing.</p><p>And another line</p>\n"

        const actual = extractContentAsText(inputHtml)
        expect(actual).toEqual("Welcome to WordPress. This is your first post.\n\nHI\ntesting.\n\nAnd another line")
    })
})