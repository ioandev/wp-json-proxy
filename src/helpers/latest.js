
import fetchBlog from './fetchBlog'
import { extractBlog } from '../convertor'
import getFromCacheOrUpdate from './cache'
import { config } from '../../config'

function updateCacheCallbackAsyncGenerator(website) {
    return async function () {
        let output = await fetchBlog(website)
        let contentOptions = config(website).contentOptions
        return extractBlog(output, contentOptions)
    }
}

export default async function (website) {
    return await getFromCacheOrUpdate(website, updateCacheCallbackAsyncGenerator(website))
}