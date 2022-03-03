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
    const apiInfo = await apiUrl.data.map(el => {    //.data porque viene de axios, saco los valores que no quiero enviar
        return {
            id: el.id,
            name: el.name,
            height: el.height.metric,   //en sistema métrico (tambien viene imperial)
            weight: el.weight.metric,
            life_span: el.life_span,
            temperament: el.temperament ? el.temperament : null,
            image: el.image.url,
        };
    });
    return apiInfo;

};

//// trayendo bases de datos
const getDbInfo = async () => {
    return await Dog.findAll({          //me traigo la info de la base de datos del modelo Dog que incluye el mod Temperament
        include:{                      //porque si no lo incluyo al crear un dog nunca me va a traer el dog con el temperamento
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);                    ////concatenando los datos de la api y DB

    return allInfo;
}

router.get('/dogs', async (req, res) => {
    const name = req.query.name
    let totalDogs = await getAllDogs();               //me traigo todos, Db y api
    if(name){                                           // si hay un nombre por query
        let dogName = await totalDogs.filter( el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ?                                  //si hay algún nombre
        res.status(200).send(dogName) :
        res.status(404).send('Doggy Not Found');
    }else {
        res.status(200).send(totalDogs);                //si no hay name por query manda un status 200 con todos los dogs
    }
})

router.get('/dogs/:id', async (req, res) => {
    const id = req.params.id;
    const allDogs = await getAllDogs();
    if(id){
        let dogId = await allDogs.filter(el => el.id == id);                                        //dentro de todos los dogs filtra el id que te estoy pasando 
        dogId.length ? res.json(dogId) : res.status(404).send('Doggy Not Found');                   //si no encuentra nada entra en la res.status
    }
})

router.get('/temperament', async (req, res) => {

    const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    const temperament = temperamentApi.data.map(el => el.temperament).join(", ").split(", ").join(", ").split(", ")

    await temperament.forEach( el => {                   //para cada uno de ellos entrá al modelo Temperament y hacé un findOrCreate
        Temperament.findOrCreate ({                      // es un método de sequelize usado para chequear si un elemento ya existe en la Db, y si no existe, lo va a crear.
            where: { name: el }                 //creáme estos temperamentos donde el nombre sea este elemento que estoy mapeando
        })
    });
    const dogTemperament = await Temperament.findAll();
    res.send(dogTemperament)
})

router.post('/dog', async (req, res) => {
    let {
        name,
        height,
        weight,
        life_span,
        image,
        createdInDb,
        temperament,
    }= req.body                                       //me traigo del body todo lo que necesito

    let dogCreated = await Dog.create({                //creo el dog con el modelo Dog y le paso lo mismo excepto el temperament porque lo tengo que encontrar en un modelo que ya tengo
        name,
        height,
        weight,
        life_span,
        image,
        createdInDb,
        })

    let temperamentDb = await Temperament.findAll({     //dentro de mi modelo encontrá todos los temperament que coincidan con lo que le paso por body
        where: {
            name: temperament,                          //name es igual al temperament que le llega por body
        }
    });

    dogCreated.addTemperament(temperamentDb)               //al dog creado agregále el temperament encontrado en la Bd que le llegó por body
    res.send('Successfull Created Doggy')
})

module.exports = router;