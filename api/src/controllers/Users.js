

const { User,Favorite,UserFav} = require('../db')

const { sendEmail } = require('./SendEmail')
const as = () => {
    const len = 8
    let randStr = ''
    for (let i = 0; i < len; i++) {
        const ch = Math.floor((Math.random() * 10) + 1)
        randStr += ch
    }
    return randStr
}
const allUsers = async function () {


    const a= await User.findAll({include:[{ model: Favorite}]})


return a



//    const b = await a?.map(er=>{
//     return {
//         id: er.id,
//         userName:er.userName,
//         email:er.email,
//         password:er.password,
//         image:er.image ,
//         phoneNumber: er.phoneNumber,
//         role:er.role ,
//         random:er.random,
//         favorites: er.favorites?.map(el=> {return{idProduct: el.idProduct, verify :el.userFav?.verify}})
//     }
// }
   //)
return a

}

const getUsers = async function (req, res) {
    //console.log(res,req)
    try {
        let a = await allUsers()
        //console.log(a)
        
        return res.status(200).send(a)
    } catch (error) {

        return res.status(400).json({ error: error.message })
    }
    
}

const postUsers = async function (req, res) {

    

    //console.log('hola')
    let {
        userName,
        password,
        email,
        image,
        phoneNumber,
        role
    } = req.body
    //console.log(req.body)

    let a = await allUsers();
    //console.log("esto es a ", a)
    

    let b = a.filter(e => e.userName === userName)
    let c = a.filter(o => o.email === email)



     if(c[0]){

         return res.send('email ya registrado')
     }
    
     if(b[0]){

       return res.status(200).send('ya tenemos creado ese usuario, prueba con otro')
    } else{

   const random = as()
    try {
        let userCreated = await User.create({
            userName,
            password,
            email,
            image,
            phoneNumber,
            role,
            random
        })
        console.log(userCreated.dataValues)

        const ID = userCreated.id
        await sendEmail(email, ID,random)

        res.send('todo ok')
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
    }
}
const putUserById = async (req, res) => {

    const { email, image, phoneNumber, userName } = req.body;
    console.log("destructurados",email, image, phoneNumber, userName )
    let arr = {}
    if(email)  arr.email = email
    if(image){ 
        let i = image.slice(12,image.length)
        console.log(i)
        arr.image= i
    }
    if(phoneNumber)  arr.phoneNumber = phoneNumber
    if(userName) arr.userName = userName
    const { id } = req.params;
    const reqBodyArray = Object.keys(arr)
    console.log("esto es arr ", arr)
    console.log("esto es el body",reqBodyArray);

    let upUser = {};

    reqBodyArray.map(u => {
        switch (u) {
            case 'userName':
                upUser.userName = req.body.userName;
                break;
            case 'email':
                upUser.email = req.body.email;
                break;
            case 'image':
                upUser.image = req.body.image.slice(12,req.body.image.length);
                break;
            case 'phoneNumber':
                upUser.phoneNumber = req.body.phoneNumber;
                break;
           /*  case 'address':
                upUser.address = req.body.address;
                break;
            case 'role':
                upUser.role = req.body.role;
                break; */
        }
    });

    try {
        await User.update(upUser, { where: { id } })
        return res.status(200).json('updated information!!');
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }


    // const fetchUsers = await User.findByPk(id_user,{})

}

const putUserById1 = async (req, res) => {

    // const { email, image, phoneNumber, role, address } = req.body;
    const { id } = req.params;
    const {random} = req.body
    //console.log("2123")
    const bringUser = await User.findByPk(id, {});
   // console.log(bringUser.dataValues.role)
    if (bringUser.dataValues.random === random){

    let upUser = {};

    upUser.role = "active";



    try {
        await User.update(upUser, { where: { id } })
        return res.status(200).json('updated information!!');
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
    }
    else{
        return res.status(404).json('Wrong Number verification')
    }

    // const fetchUsers = await User.findByPk(id_user,{})

}
module.exports = { getUsers, postUsers, putUserById, allUsers, putUserById1 }