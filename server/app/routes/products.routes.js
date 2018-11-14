module.exports = function (app) {
    const cors = require('cors');
    const path = require('path');
    const products = require('../controllers/products.controller')
    app.use(cors());
    // All remaining requests return the React app, so it can handle routing.

    app.get('/api', function (req, res) {
        res.send('Server running');
    })

    app.get('/api/search/:product/:pageNumber/:nPerPage', products.findAll);
    app.get('/api/:product/count', products.findCount);

}
