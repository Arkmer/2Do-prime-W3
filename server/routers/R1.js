const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.post('/saveTask', function(req, res){
    taskObject = req.body
    const sqlText = `insert into tasks (title, notes) values($1, $2);`
    pool.query(sqlText, [taskObject.task, taskObject.notes])
    .then(function(result){
        console.log('Task POSTed', result);
        res.send(201);
    })
    .catch(function(error){
        console.log('Error, POST, (R1):', error);
        res.sendStatus(500);
    })
});

router.get('/getAllTasks', function(req, res){
    const sqlText = 'select * from tasks;';
    pool.query(sqlText)
    .then(function(result){
        res.send(result.rows);
    }).catch(function(error){
        res.sendStatus(500);
    })
})

module.exports = router;