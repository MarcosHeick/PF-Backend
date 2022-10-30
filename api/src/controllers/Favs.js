const {UserFav,Favorites} =require('../db')


const getAllFavs = async function(){
  const all = await Favorites.findAll()
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
    up
   }= req.body

   try{
        const favoriteCreated= await Favorites.findOrCreate({
            where : {idProduct:idProduct}
        })
await favoriteCreated.addFavorite(idProduct, {through :{up:up}})


   }
   catch(error){
         
    return res.status(400).json({ error: error.message })
   }

}
module.exports={addFavorite,getFavorites}