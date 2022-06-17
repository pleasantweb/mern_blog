import {formatDistance} from 'date-fns'

export const returnDate=(date:Date)=>{
    const cdt = new Date()
    const dt = new Date(date)
 
    
    
    
    let str = formatDistance( new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 *1000), new Date(cdt.valueOf() +cdt.getTimezoneOffset() * 60 *1000), { addSuffix: true })
    
    return str
 }