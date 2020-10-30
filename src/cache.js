var maxDifferenceInSecondsForCacheToBeStale = 60
var cache = null
var cached_at = null

function setCacheTo(value) {
    let stringified = JSON.stringify(value)
    console.log("Setting cache to..:" + stringified.substring(0, 20))
    cache = stringified
}

async function updateCache(asyncCallback) {
    console.log("Updating cache called..")
    cached_at = new Date()

    // TODO: it doesn't like it if catch is not here. javascript doesn't like propagating errors from lambda parameters
    const result = await asyncCallback().catch(console.error)
    if (result == undefined) {
        setCacheTo("{}")
        return
    }
    setCacheTo(result)
}

async function checkCache(asyncCallback) {
    if (cache == null) {
        await updateCache(asyncCallback)
        return;
    }
    var now = new Date()
    var diffInSeconds = (now - cached_at) / 1000
    if (diffInSeconds > maxDifferenceInSecondsForCacheToBeStale) {
        // don't await
        updateCache(asyncCallback)
    }
}

async function getLatest(asyncCallback) {
    await checkCache(asyncCallback)
    return cache
}

export default getLatest