
//import EstimatedReadingTime from 'estimated-reading-time'
import { estimatedReadingTime, TextFormat, Options } from 'estimated-reading-time';

export default function extractReadingTime(htmlText) {

  const res = estimatedReadingTime(htmlText, TextFormat.HTML, { isTechnical: true } );
  return res.roundedMinutes + 1 // 1 for the title, and subtitle, contents, etc.
}