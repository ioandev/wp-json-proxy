
//import EstimatedReadingTime from 'estimated-reading-time'
import { estimatedReadingTime, TextFormat, Options } from 'estimated-reading-time';

export default function extractReadingTime(htmlText) {

  const res = estimatedReadingTime(htmlText, TextFormat.HTML, { isTechnical: false } );
    return res.roundedMinutes
}