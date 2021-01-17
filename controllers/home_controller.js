// just a welcome api
module.exports.home = function(req,res){
    return res.json(200,{
        message:"Welcome to Doctor's App",
        
    })
}