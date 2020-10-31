
import { extractReadingTime } from "~/src/blocks"

describe('meta block', () => {
    it('works', () => {
        let input = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vulputate, dui euismod malesuada lacinia, erat ligula egestas elit, a cursus nulla neque et nunc. Nam vestibulum ullamcorper magna, et luctus risus. Praesent rhoncus molestie fringilla. In in ultrices diam. Ut sodales id nunc quis gravida. Sed maximus, magna vitae luctus tempor, nulla mi pharetra purus, vel aliquet metus mauris accumsan urna. Suspendisse potenti. Integer et augue a erat laoreet hendrerit. Nunc ac mauris porta, fermentum lacus eu, mattis ligula. Vestibulum vel facilisis sapien, ac eleifend libero. Sed et orci dolor. Proin ultricies est eget nulla suscipit lobortis. Sed nisl est, pellentesque ut lectus eu, vestibulum semper enim. Pellentesque mollis maximus suscipit. Etiam venenatis ex nulla, et varius dolor sodales in. Suspendisse venenatis neque tortor, placerat eleifend ex mollis auctor. Sed congue condimentum justo quis finibus. Praesent vitae augue ex. Sed non condimentum quam. Vivamus arcu ante, vestibulum vulputate efficitur in, egestas ut sem. Fusce pulvinar aliquet consectetur. Vivamus volutpat massa at pharetra feugiat. Integer semper diam eu enim facilisis luctus.</p>"
        
        expect(extractReadingTime(input)).toStrictEqual(1)
    })
})