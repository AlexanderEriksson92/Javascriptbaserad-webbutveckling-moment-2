"use strict";

var express = require('express');
var app = express();
var port = 3000;

app.use(express.json());
app.use(express.static('views'));


const mongoose = require('mongoose');

// Anslut till databasen
mongoose.connect('mongodb://127.0.0.1:27017/myCB')

    .then(() => console.log('Ansluten till MongoDB'))
    .catch(err => console.error('Kunde inte ansluta', err));


// Schema 
const courseSchema = new mongoose.Schema({
    name: String,
    courseId: String,
    progression: String,
    syllabus: String,
    term: String,
    id: Number
});


const Course = mongoose.model('Course', courseSchema);

app.listen(port, () => {
    console.log(`Servern körs på http://localhost:${port}`);
});

// Hämtar alla kurser
app.get('/courses', async (req, res) => {
    try {
        let courses = await Course.find();
        res.json(courses);
    }
    catch (error) {
        res.status(500).send(error);
    }
}
);
// Hämtar en kurs med id
app.get('/courses/:id', async (req, res) => {
    
    try {
        const courseId = parseInt(req.params.id);
        if (isNaN(courseId)) {
            return res.status(400).send('Ogiltigt ID format.');
        }
        const course = await Course.findOne({ id: courseId });
        if (!course) {
            return res.status(404).send('Kursen hittades inte.');
        }
        res.json(course);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/courses', async (req, res) => {
    
    try {
       
        // Hittar det högsta idet i databasen och lägger till 1
        const highestId = await Course.find().sort('-id').limit(1);
        let newId = 1;

        // Är det fler än 0 kurser i databasen så sätts id till +1
        if (highestId.length > 0) {
            newId = highestId[0].id + 1;
        }
      
        let course = new Course({
            name: req.body.name,
            courseId: req.body.courseId,
            progression: req.body.progression,
            syllabus: req.body.syllabus,
            term: req.body.term,
            id: newId
        });
        
        console.log(course);
        course = await course.save();
        res.send(course);
    } catch (error) {
        console.error("Error Details: ", error);
        res.status(500).send(error);
    }
});
// Hämtar en kurs med id och raderar den sedan 

app.delete('/courses/:id', async (req, res) => {
    try {
        const courseId = parseInt(req.params.id);
        if (isNaN(courseId)) {
            return res.status(400).send('Ogiltigt ID format.');
        }
        // Ändrade till findOneAndDelete istället för deleteOne 
        const course = await Course.findOneAndDelete({ id: courseId });
        if (!course) {
            return res.status(404).send('Kursen hittades inte.');
        }
      
        res.send(`Kursen med id: ${req.params.id} är borttagen`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});







