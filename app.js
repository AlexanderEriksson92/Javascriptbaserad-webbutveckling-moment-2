"use strict";

var express = require('express');
var app = express();
var port = 3000;
const courses = require('./courses.json');
app.use(express.json());

app.listen(port, () => {
    console.log(`Servern körs på http://localhost:${port}`);
});
// Hämtar alla kurse
app.get('/courses', (req, res) => {
    console.log('GET /courses');
    res.json(courses);
}
);
// Hämtar en kurs med id
app.get('/courses/:id', (req, res) => {
    console.log('GET /courses/:id');
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Kursen hittades inte.');
    res.send(course);
});





