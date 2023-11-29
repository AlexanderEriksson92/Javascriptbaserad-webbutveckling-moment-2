"use strict";

var express = require('express');
var app = express();
var port = 3000;
const courses = require('./courses.json');
app.use(express.json());
app.use(express.static('views'));

// 
app.listen(port, () => {
    console.log(`Servern körs på http://localhost:${port}`);
});
// Hämtar alla kurser
app.get('/courses', (req, res) => {
    res.json(courses);
}
);
// Hämtar en kurs med id
app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c._id == req.params.id); 

    if (!course) {
        return res.status(404).send('Kursen hittades inte.');
    }

    res.send(course);
});

// Hämtar en kurs med id och raderar den sedan med splice
app.delete('/courses/:id', (req, res) => {
    try {
        const course = courses.find(c => c._id == req.params.id); 

        if (!course) {
            return res.status(404).send('Kursen hittades inte.');
        }
        
        const index = courses.indexOf(course);
        courses.splice(index, 1);
        
            res.send(`Kursen med id: ${req.params.id} är borttagen`);
       
    }
    catch (error) {
        res.status(500).send(error);
    }
});






