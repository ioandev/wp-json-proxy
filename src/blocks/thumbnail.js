let urlAndSize = function (data) {
    if (data == null)
        return null
    return {
        url: data.source_url,
        width: data.width
    }
}

export function getLargest(thumbnails) {
    if (!thumbnails.length) {
        return null;
    }
    const thumbnail = thumbnails[0]
    //for (const thumbnail of thumbnails) {
        if (thumbnail.details.full != null) {
            return thumbnail.details.full
        }
        if (thumbnail.details.medium_large != null) {
            return thumbnail.details.medium_large
        }
        if (thumbnail.details.medium != null) {
            return thumbnail.details.medium
        }
        if (thumbnail.details.thumbnail != null) {
            return thumbnail.details.thumbnail
        }
    //}
    return null
}

export default function extractThumbnails(featuredMedia, post) {
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
            } else {
                details = {
                    thumbnail: null,
                    medium: null,
                    medium_large: null,
                    full: {
                        url: media.source_url,
                        width: media_details.width,
                    }
                };
            }

            return {
                caption: media.caption.rendered,
                alt_text: media.alt_text,
                details: details
            };
        } catch (e) {
            throw `Couldn't parse thumbnails for slug ${post.slug}`
        }
    });
    return result;
}