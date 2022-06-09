const userAuthenticated = (req,res,next)=>{
    console.log('req user',req.user);
    if(req.user){
        next()
    }else{
        res.status(409).json({"Error":"Please login to complete this request"})
    }
}
module.exports = {userAuthenticated}