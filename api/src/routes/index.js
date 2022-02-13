const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temperament } = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

///trayendo datos de la api
const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            height: el.height,
            weight: el.weight,
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
                atrributes: [],
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
        let dogName = await totalDogs.filter( el => el.name.includes(name))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send('nodog');
    }else {
        res.status(200).send(totalDogs);
    }
})
module.exports = router;
