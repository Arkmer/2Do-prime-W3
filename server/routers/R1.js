const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.post('/saveTask', function(req, res){
    taskObject = req.body
    const sqlText = `insert into tasks (title, notes) values($1, $2);`
    pool.query(sqlText, [taskObject.task, taskObject.notes])
    .then(function(result){
        console.log('postTask (R1)', result);
        res.send(201);
    })
    .catch(function(error){
        console.log('postTask (R1)', error);
        res.sendStatus(500);
    })
});

router.get('/getAllTasks', function(req, res){
    const sqlText = 'select * from tasks order by id;';
    pool.query(sqlText)
    .then(function(result){
        console.log('getAllTasks (R1)', result);
        res.send(result.rows);
    }).catch(function(error){
        console.log('getAllTasks (R1)', error);
        res.sendStatus(500);
    })
})

router.delete('/taskDelete', function(req, res){
    taskToDelete = req.body.id;
    console.log('taskDelete, pre-SQL', taskToDelete);
    const sqlText = `delete from tasks where id=$1`;
    pool.query(sqlText, [taskToDelete])
    .then(function(result){
        console.log('taskDelete (R1)', result);
        res.send(200);
    }).catch(function(error){
        console.log('Error, taskDelete:', error);
        res.sendStatus(500);
    })
})

module.exports = router;