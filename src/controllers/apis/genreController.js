const db = require('../../database/models');
const sequelize = db.sequelize;

module.exports = {
    genresList: (req, res) => {
        db.Genre.findAll()
        .then(genre => {
            let response = {
                status: 200,
                meta:{
                    total: genre.length,
                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: genre
            }
            res.status(200).json(response)
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