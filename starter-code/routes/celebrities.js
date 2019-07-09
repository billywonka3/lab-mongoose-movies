const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((database)=>{
      console.log(database)
        res.render('celebrities/index', {allTheCelebs: database})
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })
});

router.get('/celebrities/details/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((singleCeleb)=>{
      console.log(singleCeleb)
        res.render('celebrities/show', {theCeleb: singleCeleb})
    })
    .catch((err)=>{
        console.log(err);
        next(err);
    })
});

router.get('/celebrities/new', (req, res, next)=>{
  console.log("test")
  res.render('celebrities/new');
})

router.post('/celebrities/create-new-celeb', (req, res, next)=>{
  const {name, occupation, catchPhrase} = req.body;
  let newCeleb = {name: name, occupation: occupation, catchPhrase: catchPhrase}

  Celebrity.create(newCeleb)
    .then(()=>{
        res.redirect('/celebrities')
    })
    .catch((err)=>{
        next(err);
    })
});

router.post('/celebrities/delete/:id', (req, res, next)=>{
  Celebrity.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.redirect('/celebrities');
    })
    .catch((err)=>{
        next(err);
    })
})

router.get('/celebrities/edit/:id', (req, res, next)=>{
  Celebrity.findById(req.params.id)
    .then((celebFromDb)=>{
            res.render('celebrities/edit', {theCeleb: celebFromDb})
    })
    .catch((err)=>{
        next(err);
    })
})

router.post('/celebrities/update/:celebID', (req, res, next)=>{
  let theID = req.params.celebID;
  Celebrity.findByIdAndUpdate(theID, req.body)
    .then((celeb)=>{
        res.redirect('/celebrities/details/'+theID)
    })
    .catch((err)=>{
        next(err);
    })
})


module.exports = router;
