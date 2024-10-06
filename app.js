const express = require('express');
const path = require('path');
const axios = require('axios');
const { pinterest, tiktok} = require('ironman-api');
const { urlencoded } = require('body-parser');

var app = express();
var PORT = process.env.PORT||4000;

app.use(express.json());
app.use('/site',express.static('static'));
app.use(express,urlencoded({extended: true}));
app.set('json spaces',2);

app.get('/home',(req, res) => {
    res.send('WELCOME, MADE WITH LOVE BY HAKI');
});


app.get('/image', (req, res) => {
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', 'inline; filename="metamatrix.jpg"');
    res.sendFile(path.join(__dirname, 'img', 'static/metamatrix.jpg'));
  });


  app.get('/pinterest', async (req, res) => {
    var { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Haki need url' });
    try {
      var data = await pinterest(url);
      res.json(data);
    } catch (error) {
      res.status(404).json({ error: 'FAILED' });
    }
  });


  app.get('/tiktok', async (req, res) => {
    var url = req.query.url;
    if (!url) return res.status(404).json({ error: 'Haki need url' });
    try {
      var data = await tiktok(url);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'FAILED' });
    }
  });

  app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
  });