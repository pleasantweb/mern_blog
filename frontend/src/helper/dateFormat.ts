import {formatDistance} from 'date-fns'

export const returnDate=(date:string)=>{
    let str = formatDistance(new Date(date), new Date(), { addSuffix: true })
    return str
 }