const express = require('express')
const router = express.Router()
const Ninja = require('../models/mongo')

router.get('/ninjas', function (req, res, next) {
  //   Ninja.find({}).then(function(ninjas){
  // res.send(ninjas)
  //   })
  Ninja.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        distanceField: 'dist.calculated',
        maxDistance: 100000,
        spherical: true
      }
    }
  ]).then(function (ninjas) {
    res.send(ninjas)
  })
})

router.post('/ninjas', function (req, res, next) {
  // var ninja = new Ninja(req.body)
  // ninja.save()
  Ninja.create(req.body)
    .then(function (ninja) {
      res.send(ninja)
    })
    .catch(next)
})

router.put('/ninjas/:id', function (req, res, next) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
      res.send(ninja)
    })
  })
})

router.delete('/ninjas/:id', function (req, res, next) {
  Ninja.findByIdAndRemove({ _id: req.params.id }).then(function (ninja) {
    res.send(ninja)
  })
  // res.send({ type: 'DELETE' })
})

module.exports = router
