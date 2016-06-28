var express = require('express');
var router = express.Router();
var Item = require('../database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// call the GET method, and define an anonymous function
router.get('/items', function(req, res, next) {

// query the data base to find all of the Items
    Item.find({}, function(err, data){

// handle an error
        if (err) {
            res.json(err);
        }
// handle an empty database by checking if the data array is empty
        else if (data.length===0) {
            res.json({message: 'There are no items in the database.'});
        }
// if there are Items, return them
        else {
            res.json(data);
        }
    });
});


// call the post method, and define an anonymous function
router.post('/items', function(req, res, next) {

// instantiate a new Item with the values supplied by the request
    var newItem = new Item({name: req.body.name, type: req.body.type});

// save the new item using a mongoose function
    newItem.save(function(err, data){
// handle an error
        if (err) {
            res.json(err);
        }
// no error, then return the data in the json format
        else {
            res.json(data);
        }
    });
});


//PATCH
router.put('/items/:id', function(req, res, next) {
    var id = {_id: req.params.id};
    var update = {name: req.body.name, type: req.body.type};
    var options = {new: true};

    Item.findOneAndUpdate(id, update, options, function(err, data){
        if (err) {
            res.json(err.message);
        }
        else {
            res.json(data);
        }
    });
});

//DELETE
router.delete('/items/:id', function(req, res, next) {
    Item.findOneAndRemove({_id: req.params.id}, function(err, data){
        if (err) {
            res.json(err.message);
        }
        else if (data.length===0) {
            res.json({message: 'An item with that id does not exist in this database.'});
        }
        else {
            res.json({message: 'Success. Item deleted.'});
        }
    });
});

module.exports = router;
