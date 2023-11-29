"use strict";

var express = require('express');
var app = express();
var port = 3000;
const courses = require('./courses.json');
app.use(express.json());

app.listen(port, () => {
    console.log(`Servern körs på http://localhost:${port}`);
});
// Hämtar alla kurser
app.get('/courses', (req, res) => {
    console.log('GET /courses');
    res.json(courses);
}
);
// Hämtar en kurs med id
app.get('/courses/:id', (req, res) => {
    console.log('GET /courses/id');
    const course = courses.find(c => c._id == req.params.id); 

    if (!course) {
        return res.status(404).send('Kursen hittades inte.');
    }

    res.send(course);
});

app.delete('/courses/:id', (req, res) => {
    try {
        const course = courses.find(c => c._id == req.params.id); 

        if (!course) {
            return res.status(404).send('Kursen hittades inte.');
        }
        
        const index = courses.indexOf(course);
        courses.splice(index, 1);
        setTimeout(() => {
            res.send(`Kursen med id: ${req.params.id} är borttagen`);
        }, 1000);
    }
    catch (error) {
        res.status(500).send(error);
    }
});






