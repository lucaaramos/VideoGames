const Router = require('express')
const router = Router();
const {Genres} = require('../db')

router.get('/', async(req, res) => {
    try{
        let genres = await Genres.findAll()
        res.status(200).json(genres)
    }catch(err){
        res.status(404).send(err)
    }
})

module.exports = router