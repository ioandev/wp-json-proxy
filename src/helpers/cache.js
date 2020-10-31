var maxDifferenceInSecondsForCacheToBeStale = 60
var cache = {}
var cached_at = {}

function setCacheTo(website, value) {
    let stringified = JSON.stringify(value)
    console.log("Setting cache to..:" + stringified.substring(0, 50))
    cache[website] = stringified
}

async function updateCache(website, updateCacheCallbackAsync) {
    console.log("Updating cache called..")
    cached_at[website] = new Date()

    // TODO: it doesn't like it if catch is not here. javascript doesn't like propagating errors from lambda parameters
    const result = await updateCacheCallbackAsync().catch(console.error)
    if (result == undefined) {
        setCacheTo(website, "{}")
        return
    }
    setCacheTo(website, result)
}

async function checkCache(website, updateCacheCallbackAsync) {
    if (cache[website] == null) {
        await updateCache(website, updateCacheCallbackAsync)
        return;
    }
    var now = new Date()
    var diffInSeconds = (now - cached_at[website]) / 1000
    if (diffInSeconds > maxDifferenceInSecondsForCacheToBeStale) {
        // don't await
        updateCache(website, updateCacheCallbackAsync)
    }
}

async function getFromCacheOrUpdate(website, updateCacheCallbackAsync) {
    await checkCache(website, updateCacheCallbackAsync)
    return cache[website]
}

export default getFromCacheOrUpdate