/** импорт библиотеки express */
const express = require("express");
/** импорт библиотеки cors(необходима для отправки запросов с браузера) */
const cors = require("cors");

/** импорт стандартного модуля node.js типа events(способ управления событиями node.js), чтобы по какому-то событию возвращался ответ на client */
const events = require("events");

const PORT = 5000;

/** создается экземпляр приложения из библиотеки express */
const app = express();

/** добавление cors-middleware */
app.use(cors());

/** endpoint для get-запроса: 1-й параметр это маршрут, 2-й параметр это callback кот. будет отрабатывать по 1-му маршруту (параметрами он пр инимает запрос и ответ) */
app.get("get-message", (req, res) => {});

/** endpoint для post-запроса: 1-й параметр это маршрут, 2-й параметр это callback кот. будет отрабатывать по 1-му маршруту (параметрами он пр инимает запрос и ответ) */
app.post("new-message", (req, res) => {});

/** слушатель 5000 порта, в случае успешного выполнения в логи будет выводиться сообщение */
app.listen(PORT, () => console.log(`server start on port ${PORT}`));
