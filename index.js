const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true })); //for url format post requests
app.use(express.json()); //for parsing json format post requests
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
let comments = [{
        id: uuidv4(),
        username: 'Rahul',
        comment: 'lol this is funny!'
    },
    {
        id: uuidv4(),
        username: 'Indresh',
        comment: 'Damn good!!'
    },
    {
        id: uuidv4(),
        username: 'Pratik',
        comment: 'Its good!!xD'
    },
    {
        id: uuidv4(),
        username: 'Ankit',
        comment: 'Nice!!'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

//create a new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

//new comment route
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuidv4() });
    res.redirect("/comments");
})

//showing comment by id
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

//updating a comment
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

app.delete('/comments/:id/', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.listen(3000, () => {
    console.log("LISTENING ON 3000!!!");
})

// GET /comments - list all comments             INDEX
// POST /comments - Create a new Comment         CREATE
// GET /comments/:id - get one comment using id; SHOW
// PATCH /comments/:id - update one comment      UPDATE
// DELETE /comments/:id - delete a comment       DELETE