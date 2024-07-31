const express = require('express');
const path = require('path')

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
});
app.use((req, res) => {
    res.status(404).send(messages.notFound);
});

const port = 3000;
app.listen(port, () => {
 console.log(`Server is running at http://localhost:${port}`);
});