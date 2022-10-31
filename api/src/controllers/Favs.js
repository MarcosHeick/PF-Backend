const {UserFav,Favorite,User} =require('../db')


const getAllFavs = async function(){
  const all = await Favorite.findAll()
    return all
}
const getFavorites = async function(req,res){
    const a =await getAllFavs()
    try{
        res.status(200).send(a)
    }
    catch(error){
         
        return res.status(400).json({ error: error.message })
    }
}

const addFavorite = async function(req,res){
  let {
    idProduct,
    boolean,
    idUser
   }= req.body
   
  try{
    //const prueba= await Favorite.create({idProduct:"123"})
    const bringUser = await User.findByPk(idUser, {});
   // console.log(bringUser)
        const favoriteCreated= await Favorite.findOrCreate({
            where : {idProduct:idProduct}
        })
       console.log(favoriteCreated)
const a=await bringUser.addFavorite(favoriteCreated[0],{through: {verify:boolean}})

        res.status(200).send(a)
  }
   catch(error){
         
    return res.status(400).json({ error: error.message })
   }

}
module.exports={addFavorite,getFavorites}