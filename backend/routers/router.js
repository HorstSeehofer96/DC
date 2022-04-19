const MYController = require('../controllers/controller.js');


module.exports = function(app){
    app.get('/api', MYController.getMy);
    app.get('/api/:id', MYController.getMyOne)
    app.post('/api', MYController.createMY);
    app.put('/api/:id', MYController.updateMy);
    app.delete('/api/:id', MYController.deleteMy)

}
