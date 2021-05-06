const express = require("express");
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

const posts = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/posts', (req, res) => {
    console.log(posts);
    return res.send(posts);
}
);

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    console.log(req.body);
    posts[id] = {
        id,
        title
    };

    return res.status(201).send(posts[id]);
});

app.listen(4000, () => console.log('listening to port 4000'));