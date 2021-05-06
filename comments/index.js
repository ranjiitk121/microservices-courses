const express = require("express");
const { randomBytes } = require('crypto');
const cors = require("cors");

const app = express();

const commentsByPostsId = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostsId[req.params.id] || []);
}
);

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const { id } = req.params;
    const comments = commentsByPostsId[id] || [];
    comments.push({
        content,
        commentId
    });

    commentsByPostsId[id] = comments;
    return res.status(201).send({ comments });
});

app.listen(4001, () => console.log('listening to port 4001'));