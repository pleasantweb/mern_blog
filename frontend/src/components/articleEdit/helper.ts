import { CloudImage } from "./CloudImage"

export const onFileChange=async(file:File)=>{

    const form_data = new FormData()
    let preset = process.env.REACT_APP_PRESET
    if(preset){
     form_data.append('upload_preset',preset)
    }
    if(file){
            form_data.append('file',file)
           const imageUrl:string =await CloudImage(form_data)
  
         if(imageUrl){
           console.log(imageUrl);
           
            return imageUrl
        }else{
          return '' // <-- put an error image url here
        }
    }
  
    return '' // <-- put an error image url here
  }