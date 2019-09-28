const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("<a href='/next'>Hey you!</a>");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

app.get("/next", (req, res) => {
    res.send("<a href='/'>Hey you!</a>");
});