let urlAndSize = function (data, thumbnailOptions) {
    let hostname = ""
    let baseUrl = ""
    if (thumbnailOptions) {
        hostname = thumbnailOptions.hostname 
        baseUrl = thumbnailOptions.baseUrl
    }
    if (data == null)
        return null

    let url = data.source_url.replace(hostname, baseUrl)
    return {
        url,
        width: data.width
    }
}

let getLargestFromDetails = (details) => {
    if (details.full != null) {
        return details.full
    }
    if (details.medium_large != null) {
        return details.medium_large
    }
    if (details.medium != null) {
        return details.medium
    }
    if (details.thumbnail != null) {
        return details.thumbnail
    }

    return null
}

export function getLargest(thumbnails) {
    if (!thumbnails.length) {
        return null;
    }
    const thumbnail = thumbnails[0]
    const details = thumbnail.details
    //for (const thumbnail of thumbnails) {
        let largest = getLargestFromDetails(details)
        if (largest != null) {
            return largest
        }
    //}
    return null
}

export default function extractThumbnails(featuredMedia, thumbnailOptions) {


    let result = featuredMedia.map(media => {
        try {
            let media_details = media.media_details
            let sizes = media_details.sizes;

            let details = {}
            if (Object.keys(sizes).length != 0) {
                details = {
                    thumbnail: urlAndSize(sizes.thumbnail),
                    medium: urlAndSize(sizes.medium),
                    medium_large: urlAndSize(sizes.medium_large),
                    full: urlAndSize(sizes.full)
                };
                details.always = getLargestFromDetails(details)
            } else {
                details = {
                    thumbnail: null,
                    medium: null,
                    medium_large: null,
                    full: urlAndSize({
                        source_url: media.source_url,
                        width: media_details.width,
                    }, thumbnailOptions),
                    always: urlAndSize({
                        source_url: media.source_url,
                        width: media_details.width,
                    }, thumbnailOptions)
                };
            }

            return {
                caption: media.caption.rendered,
                alt_text: media.alt_text,
                details: details
            };
        } catch (e) {
            throw `Couldn't parse thumbnails`
        }
    });
    return result;
}