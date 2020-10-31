import decoder from '~/src/helpers/decoder'

export default function extractTitle(post) {
    let title = decoder(post.title.rendered);

    let tags = [];

    if (title.indexOf("#") != 0) {
        let hashtags = title.split("#");

        for (let i = 1; i < hashtags.length; i++) {
            tags.push(hashtags[i].trim());
        }

        title = hashtags[0].trim();
    }
    return { title, tags };
}