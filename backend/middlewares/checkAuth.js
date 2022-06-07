const userAuthenticated = (req,res,next)=>{
    if(req.user){
        next()
    }else{
        res.status(409).json({"Error":"Please login to complete this request"})
    }
}
module.exports = {userAuthenticated}