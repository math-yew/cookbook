const express = require('express');
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;

const config = require('./config.js');
const app = express();
let db;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use(bodyParser.json());

console.log("- - - - - - - - - -");

MongoClient.connect(config.uri, { useNewUrlParser: true }, (err, client) => {
  console.log("mongo callback");
  if (err) return console.log(err);
  db = client.db('mealplanner');
  app.listen(3005, () => {
    console.log('listening on 3005');
  });
});

console.log("*         *")

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/data/:id', (req, res) => {
  console.log("get id");
  db.collection('recipes').findOne({_id: ObjectId(req.params.id)}, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.get('/meallist/:id', async (req, res) => {
  console.log("get id");
  try {
    const result = await db.collection('meallists').aggregate([
      { $match: {_id: ObjectId(req.params.id)}},
      {
        $lookup: {
          from: "recipes",
          localField: "meals",
          foreignField: "_id",
          as: "mealDetails",
        }
      }
    ]).toArray();
    // console.log(JSON.stringify(result));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.get('/dataOne', (req, res) => {
  console.log("GETone");
  db.collection('recipes').findOne({},(err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.get('/data', (req, res) => {
  console.log("get");
  db.collection('recipes').find({}).toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.get('/cases/:archive', (req, res) => {
  console.log("case");
  let query = (req.params.archive == 'true') ? {} : {archive: {$ne:true}};
  db.collection('recipes').find(query).toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.get('/recipes/:archive', (req, res) => {
  console.log("case");
  let query = (req.params.archive == 'true') ? {} : {archive: {$ne:true}};
  db.collection('recipes').find(query).toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.get('/meallists/:archive', (req, res) => {
  console.log("case");
  let query = (req.params.archive == 'true') ? {} : {archive: {$ne:true}};
  db.collection('meallists').find(query).toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.post('/data', (req, res) => {
  console.log("post");
  db.collection('recipes').insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.put('/data/:id', (req, res) => {
  console.log("put");
  db.collection('recipes').updateOne({_id: ObjectId(req.params.id)}, {$set: req.body}, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.delete('/data/:id', (req, res) => {
  console.log("delete");
  db.collection('recipes').deleteOne({_id: ObjectId(req.params.id)}, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

// app.delete('/data/:id', (req, res) => {
//   console.log("delete");
//   db.collection('recipes').deleteMany({tasks: []}, (err, result) => {
//     if (err) return console.log(err);
//     res.send(result);
//   });
// });
