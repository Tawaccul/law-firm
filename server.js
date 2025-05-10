// server.js
const express = require('express');
const path = require('path');
const prerender = require('prerender-node');

const app = express();

// 1) Указываем ваш токен из Prerender.io
app.use(prerender.set('prerenderToken', process.env.PRERENDER_TOKEN || 'hUwoH3kytewIBx6BBeGp'));

// 2) Статика вашего Vue-SPA
app.use(express.static(path.join(__dirname, 'dist')));

// 3) На все другие запросы — отдаём index.html
//    (чтобы Vue-Router мог разруливать путь на клиенте)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 4) Стартуем сервер
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
