const Url =require("../model/model")
const shortId =require("shortid")

const creatUrl= async function (req,res){
    try{
        let data =req.body
        if(Object.keys(data).length==0)return res.status(400).send({status:false,msg:"can't create datat with empty body"})
        let url=shortId.generate().toLowerCase()
        let baseUrl="http://localhost:3000/"
        data.shortUrl=baseUrl+url
        data.urlCode=url
        let olddata=await Url.findOne({longUrl:data.longUrl}).select({"urlCode":1,"longUrl":1,"shortUrl":1,"_id":0})
        if(olddata){return res.status(201).send({status:true,mdg:"data already exist",data:olddata})}
        let createdata= await Url.create(data)
        ["_id","__v","createdAt","updatedAt"].forEach(x => delete collegedetails[x])
        res.status(201).send({status:true,data:createdata})

    }catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}

const geturl= async function(req,res){
    try{
let url=req.params.urlCode

let LongUrl=await Url.findOne({urlCode:url}).select({longUrl:1,_id:0})
if(!LongUrl){return res.status(404).send({status:false,msg:"can't find any data with this urlcode"})}  

return res.status(302).redirect(LongUrl.longUrl)
// res.status(302).send(LongUrl)

}catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}


module.exports={creatUrl,geturl}