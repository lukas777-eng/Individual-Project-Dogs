const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temperament } = require('../db');

const router = Router();
const { API_KEY } = process.env;


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

///trayendo datos de la api
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            height: el.height.metric,
            weight: el.weight.metric,
        };
    });
    return apiInfo;

};

//// trayendo bases de datos
const getDbInfo = async () => {
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

////concatenando los datos de la api y DB
const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}

router.get('/dogs', async (req, res) => {
    const name = req.query.name
    let totalDogs = await getAllDogs();
    if(name){
        let dogName = await totalDogs.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send('nodog');
    }else {
        res.status(200).send(totalDogs);
    }
})

router.get('/dogs/:id', async (req, res) => {
    const id = req.params.id;
    const allDogs = await getAllDogs();
    if(id){
        let dogId = await allDogs.filter((el) => el.id == id);
        dogId.length ? res.json(dogId) : res.status(404).send('doggy Not Found');
    }
})

router.get('/temperament', async (req, res) => {

    const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

    const temperament = temperamentApi.data.map(el => el.temperament).join(", ").split(", ")


    temperament.forEach(el=> {
        Temperament.findOrCreate ({
            where:{name:el}
        })
    });
    const dogTemperament = await Temperament.findAll();
    res.send(dogTemperament)

})

router.post('/dog', async(req, res) => {
    const {
        name,
        height,
        weight,
        temperament,
    }= req.body

    const dogCreated = await Dog.create({
        name,
        height,
        weight,
    })

    const temperamentDb = await Temperament.findAll({
        where: {
            name: temperament
        }
    })

    dogCreated.addTemperament(temperamentDb)
    res.send('Perro creado con éxito')
})

module.exports = router;