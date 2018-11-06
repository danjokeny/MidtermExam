//foobar.js module

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    asyncHandler = require('express-async-handler'),
    FooBar = mongoose.model('FooBar');


module.exports = function (app, config) {
    app.use('/api', router);

    //API call routes below

    //create new Foo api Post request with json passed in raw body
    //Sample: http://localhost:3300/api/foos
    /*Raw Data Json format
    {
        "Foo" : "Help get Exam correct",    
        "Woo" : 5
    }
    */
   router.post('/foos', asyncHandler(async (req, res) => {
    logger.log('info', 'Creating (POST) FooBar Async Post');
    var user = new FooBar(req.body);
    logger.log('info',req.body);
    await user.save()
            .then(result => {
                    logger.log('info', 'Created FooBar = ' + result);
                    res.status(201).json(result);
    })
}));


    
    //Get All Todo Async Request
    //Sample: http://localhost:3300/api/todo/todos
    router.get('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Get (ALL) Foos Async Request');
        let query = FooBar.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
                logger.log('info', 'JSON = ' + result);
                res.status(200).json(result);
        })
    }));
    
    
    //Get specific todo  id Request 
    //Sample: http://localhost:3300/api/todos/5bd7af2e0ba51068bc63f58f
    router.get('/foos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get specific todo by id =  %s', req.params.id);
        await FooBar.findById(req.params.id).then(result => {
                logger.log('info', 'getbyID Todo = ' + result);
                res.status(200).json(result);
        })
    }));

    //Update existing data row with json passed in raw body
    //Sample:http://localhost:3300/api/todos/
    /*
{
    "_id": "5bd7af2e0ba51068bc63f58f",
    "Todo": "rock the exam",
    "Priority": "High",
}
    */
    router.put('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating todo');
        await FooBar.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                logger.log('info', 'update Todo = ' + result);
                res.status(200).json(result);
            })
        }));

    //Delete existing Todo
    //Sample:http://localhost:3300/api/Todo/5bd7ae5d76938a5cf02f2272
    router.delete('/foos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting todo id =  %s', req.params.id);
        await FooBar.remove({ _id: req.params.id })
                .then(result => {
                        logger.log('info', 'Delete Todo = ' + req.params.id);
                        res.status(200).json(result);
        })
    }));

};