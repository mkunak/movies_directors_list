const express = require('express');
const graphqlHTTP = require('express-graphql');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('../schema/schema');

const app = express();
const PORT = config.get('port') || 3005;

app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", config.get('requestFromDomain'));
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

async function start() {

  const mdbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  try {
    mongoose.connection.on('connecting', function () {
      console.log("Trying to establish a connection to mongoDB...");
    });

    mongoose.connection.on('connected', function () {
      console.log("Connection established successfully!");
    });

    mongoose.connection.on('error', function (err) {
      console.log('Connection to mongoDB failed ' + err);
    });

    mongoose.connection.on('disconnected', function () {
      console.log('MongoDB connection closed');
    })

    await mongoose.connect(config.get('mongoUri'), mdbOptions);

    app.listen(PORT, (err) => {
      err ? console.log(err) : console.log('Server started!');
    });

  } catch (e) {
    // throw new Error(e);
    console.log('Server Error: ', e.message);
    process.exit(1);
  }
}

start();
