// Create web server
// Create a web server that listens on port 3000 and serves the following routes:
// GET /comments - responds with a list of comments
// POST /comments - creates a new comment
// GET /comments/:id - responds with a specific comment
// PUT /comments/:id - updates a specific comment
// DELETE /comments/:id - deletes a specific comment
// The comments should be stored in memory (i.e. in a variable), no need to use a database.

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let comments = [
  {
    id: 1,
    comment: 'This is a comment.'
  }
];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  let newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  res.json(newComment);
});

app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id == req.params.id);
  res.json(comment);
});

app.put('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id == req.params.id);
  comment.comment = req.body.comment;
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  comments = comments.filter(comment => comment.id != req.params.id);
  res.json({message: 'Comment deleted successfully.'});
});

app.listen(3000, () => {
  console.log('Server is running on port', 3000)});