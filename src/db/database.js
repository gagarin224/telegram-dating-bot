const mongoose = require('mongoose');
const { dataURL } = require('../config/config.json');

mongoose.connect(
    dataURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    err => {
      if (err) throw err;
      console.log('[Database] Database is successfully connected.');
    },
);