const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bot ishlayapti!');
});

app.listen(3000, () => {
    console.log('Server ishga tushdi!');
});

module.exports = app; // ES module emas, balki CommonJS usuli
