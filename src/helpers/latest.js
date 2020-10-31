
import fetchBlog from './fetchBlog'
import { extractBlog } from '../convertor'
import getFromCacheOrUpdate from './cache'
import { config } from '../../config'

function updateCacheCallbackAsyncGenerator(website) {
    return async function () {
        let output = await fetchBlog(website)
        let configForWebsite = config(website)
        let contentOptions = configForWebsite.contentOptions
        let metaOptions = configForWebsite.metaOptions
        let authorNameLinkMappings = configForWebsite.authorNameLinkMappings
        let baseUrl = configForWebsite.baseUrl
        return extractBlog(output, contentOptions, metaOptions, authorNameLinkMappings, baseUrl)
    }
}

export default async function (website) {
    return await getFromCacheOrUpdate(website, updateCacheCallbackAsyncGenerator(website))
}