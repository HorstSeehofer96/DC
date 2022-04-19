const { MY } = require('../models/model.js');

module.exports.getMyOne = (request, response) => {
    MY.findOne({ _id: request.params.id })
        .then(MY => {
            response.json(MY)
        })
        .catch(err => response.json(err));
}
module.exports.getMy = (request, response) => {
    MY.find()
        .then(my => response.json(my))
        .catch(err => response.json(err));
}

module.exports.deleteMy = (request, response) => {
    MY.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.updateMy = (request, response) => {
    MY.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedMY => response.json(updatedMY))
        .catch(err => response.json(err))

}

module.exports.createMY = (request, response) => {
    
    const { pirateName,
        imgUrl,
        catchPhrase,
        counterValue,
        rank,
        pegLeg,
        eyePatch,
        hookHand } = request.body;
    MY.create({
        pirateName,
        imgUrl,
        catchPhrase,
        counterValue,
        rank,
        pegLeg,
        eyePatch,
        hookHand
    })
        .then(my => response.json(my))
        .catch(err => response.json(err)
        );
}