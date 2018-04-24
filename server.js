var express = require('express');
var path = require('path');
var uuidv4 = require("uuid/v4");

var bodyParser = require('body-parser');

var dataTaskLayer = require('./repo/dataTaskLayer.js');

var app = express();
var port = 8095;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/getTaskSet', function(req, res){
    dataTaskLayer.getTaskSet(function(taskSet){
        var obj = {
            success:true,
            taskSet : taskSet
        };
        res.send(obj);
    });
});

app.post('/updateTask', function(req,res){

});

app.post('/addTask', function(req, res){

    if(!req.body.name){
        res.send(
            {
                success:false,
                errorSet:['TASKNAME_EMPTY']
            }
        );
    }else{
        var task = {
            id:uuidv4(),
            name:req.body.name,
            done:false
        };
        dataTaskLayer.addTask(task, function(){
            res.send({ success:true, task:task });
        });
    }
});


app.post('/deleteTask', function(req,res){
    if(!req.body.id){
        res.send(
            {
                success:false,
                errorSet:['ID_EMPTY']
            }
        );
    }else{
        dataTaskLayer.deleteTaskById(req.body.id, function(todo){
            res.send({ success:true, todo:todo });
        });
    }
});







console.log("Server started port 8095");

app.listen(port);

