const axios = require('axios')
const {Videogame, Genres} = require('../db')
const {apikey} = process.env

const getApiInfo = async() => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${apikey}`)
    try{
        const apiInfo = apiUrl.data.results.map(e => {
            return {
                id : e.id,
                name: e.name,
                img: e.background_image,
                genres: e.genres.map(e => e.name).join(', '),
                released: e.released,
                rating: e.rating,
                platform: e.platforms.map((e) => e.platform.name).join(', ')
            }
        }) 
        return apiInfo
    }catch(err){
        console.log(err)
    }
}


const getInfoDB = async() =>{
    return await Videogame.findAll({
        include:{
            model: Genres,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    })
}

const getAllVideoGames = async () => {
    const apiInfo = await getApiInfo();
    const apiDbInfo = await getInfoDB();
    const InfoTotal = [...apiInfo,...apiDbInfo];
    return InfoTotal;
}

module.exports = {getAllVideoGames}

