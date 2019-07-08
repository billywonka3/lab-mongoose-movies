const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

/* GET home page */
router.get('/movies', (req, res, next) => {
  Movie.find()
  .then((database)=>{
    console.log(database)
      res.render('movies/index', {allTheMovies: database})
  })
  .catch((err)=>{
      console.log(err);
      next(err);
  })
});

router.get('/movies/details/:id', (req, res, next) => {
  Movie.findById(req.params.id)
  .then((singleMovie)=>{
    console.log(singleMovie)
      res.render('movies/show', {theMovie: singleMovie})
  })
  .catch((err)=>{
      console.log(err);
      next(err);
  })
});

router.get('/movies/new', (req, res, next)=>{
  console.log("test")
  res.render('movies/new');
})

router.post('/movies/create-new-celeb', (req, res, next)=>{
  const {name, occupation, catchPhrase} = req.body;
  let newCeleb = {name: name, occupation: occupation, catchPhrase: catchPhrase}

  Movie.create(newMovie)
  .then(()=>{
      res.redirect('/movies')
  })
  .catch((err)=>{
      next(err);
  })
});

router.post('/movies/delete/:id', (req, res, next)=>{
  Movie.findByIdAndRemove(req.params.id)
  .then(()=>{
      res.redirect('/movies');
  })
  .catch((err)=>{
      next(err);
  })
})

router.get('/movies/edit/:id', (req, res, next)=>{
  Movie.findById(req.params.id)
  .then((movieFromDb)=>{
          res.render('movies/edit', {theMovie: movieFromDb})
  })
  .catch((err)=>{
      next(err);
  })
})

router.post('/movies/update/:movieID', (req, res, next)=>{
  let theID = req.params.movieID;
  Movie.findByIdAndUpdate(theID, req.body)
  .then((celeb)=>{
      res.redirect('/movies/details/'+theID)
  })
  .catch((err)=>{
      next(err);
  })
})


module.exports = router;
