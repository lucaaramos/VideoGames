const {Router} = require('express')
const router = Router();
const {getAllVideoGames} = require('../Services/index')
const {Videogames, Genres} = require('../db')


router.get('/', async(req, res) => {
    const {name} = req.query
    let total = await getAllVideoGames();

    try{
        if(name){
            let gameName = total.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            gameName.length ?
            res.status(200).send(gameName) :
            res.status(404).send('Game not found')
        }else{
            res.status(200).json(total)
        }
    }catch(err){
        console.log(err)
    }
})


module.exports = router;