const express = require('express');
const app = express();
const port = 3001;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port,() => {
    console.log(`Server is started on port 3000`);
})

app.sequelize.sync()
    .then((result) => {
        app.listen(port, () => {
            console.log(`Server is strated`);
        })
    })
    .catch((err) => {
        console.log(err);
    })

app.post('/komik', async (req, res) => {
    const data = req.body;
    try {
        const komik = await db.Komik.create(data);
        res.status(komik);
    } catch (error) {
    res.send({message : error.message});
    }
});
