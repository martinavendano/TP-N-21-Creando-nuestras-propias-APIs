const db = require('../../database/models');
const sequelize = db.sequelize;

module.exports = {
    create: (req, res) => {
        db.Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
        .then(newMovie => {
            let arr = [];
            arr.push(newMovie);

            let response = {
                status: 200,
                meta:{
                    total: arr.length,
                    msg: 'pelicula creada con exito',
                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: arr
            }
            return res.status(200).json(response)

        })   
        .catch(error => {
            let response = {
                status: 500,
                meta:{
                    msg: 'ha ocurrido un error',
                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: error
            }
            return res.status(500).json(response)
        })
    },

    destroy: (req, res) => {
        let movieId = req.params.id;

        let peli = db.Movie.findOne({
            where: {id: movieId}
        })

        let eliminar = db.Movie.destroy({
            where: {id: movieId},
            force: true
        }) // force: true es para asegurar que se ejecute la acción
        Promise.all([peli, eliminar])
        .then(([peli, eliminar])=>{

            let arr = [];
            arr.push(peli);

            let response = {
                status: 200,
                meta:{
                    total: arr.length,
                    msg: 'la pelicula fue eliminado con exito',
                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: arr
            }
            return res.status(200).json(response);

        })
        .catch(error => {
            let response = {
                status: 500,
                meta:{
                    msg: 'ha ocurrido un error',
                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: error
            }
            return res.status(500).json(response)
        })
    }
}