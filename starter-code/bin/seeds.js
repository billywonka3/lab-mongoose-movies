const mongoose     = require('mongoose');
// const Celebrity    = require('../models/Celebrity');
const Movie    = require('../models/Movie');

mongoose
  .connect('mongodb://localhost/celebrity-database', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

// const celebArray = [
//   {
//     name: 'Duck Dynasty Dude',
//     occupation: 'Duck Hunt Champion',
//     catchPhrase: 'I dont give a duck'
//   },
//   {
//     name: 'Barney Stinson',
//     occupation: 'Unknown',
//     catchPhrase: 'When im sad, I stop being sad and be awesome instead'
//   },
//   {
//     name: 'Vegeta',
//     occupation: 'Dominator of worlds',
//     catchPhrase: 'Its over 9000!'
//   }
// ];

const movieArray = [
  {
    title: 'Shutter (2004)',
    genre: 'Horror',
    plot: 'A young photographer and his girlfriend discover mysterious shadows in their photographs after a tragic accident. They soon learn that you can not escape your past.'
  },
  {
    title: 'Royal Tramp',
    genre: 'Comedy',
    plot: 'The story of Wilson Bond, a pimp who after saving Chan, the leader of the Heaven and Earth society, a revolutionary group, is made a member.'
  },
  {
    title: 'Cinema Paradiso',
    genre: 'Drama',
    plot: 'A filmmaker recalls his childhood when falling in love with the pictures at the cinema of his home village and forms a deep friendship with the cinemas projectionist.'
  },
];

// Celebrity.create(celebArray)
// .then(()=>{
//   console.log('it worked')
//   mongoose.disconnect()
// })
// .catch(()=>{
//   console.log('it didnt work')
// })

Movie.create(movieArray)
.then(()=>{
  console.log('it worked')
  mongoose.disconnect()
})
.catch(()=>{
  console.log('it didnt work')
})