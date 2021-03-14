const {verify}=require('jsonwebtoken');

module.exports={
    checkToken:(req,res,next)=>{
        let token=req.get('authorization');
        if(token){
        token =token.slice(7);
        verify(token,process.env.secret_key,(err,decodedobj)=>{
            if(err){
                res.json({message:"invalid token"})
            }
            else{
                next()
            }
        })
        }
        else{
            res.json({message:"unauthorized user"})
        }
    }
}