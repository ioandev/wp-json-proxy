
import fetchBlog from './fetchBlog'
import { extractBlog } from '../convertor'
import getFromCacheOrUpdate from './cache'

function updateCacheCallbackAsyncGenerator(website) {
    return async function () {
        let output = await fetchBlog(website)
        return extractBlog(output, website)
    }
}

export default async function (website) {
    return await getFromCacheOrUpdate(website, updateCacheCallbackAsyncGenerator(website))
}