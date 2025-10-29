const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');
const komik = require('./models/komik');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port,() => {
    console.log(`Server is started on port`);
})

db.sequelize.sync()
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

app.get('/komik', async (req, res) => {
    try{
        const komiks = await db.Komik.findAll();
        res.send(komiks);
    }
    catch (error){
        res.send({message : error.message});
    }
});

app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({ message: 'Komik not found' });
        }
        await komik.update(data);   
        res.send({ message: 'Komik berhasil di update' });
    } 
    catch (error) {
        res.send({ message: error.message });
    }
});

app.delete('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({ message: 'Komik not found' });
        }
        await komik.destroy();
        res.send({ message: 'Komik berhasil dihapus' });
    } catch (error) {
        res.send({ message: error.message });
    }
});