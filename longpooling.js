/** импорт библиотеки express */
const express = require("express");
/** импорт библиотеки cors(необходима для отправки запросов с браузера) */
const cors = require("cors");
/** импорт стандартного модуля node.js типа events(способ управления событиями node.js), чтобы по какому-то событию возвращался ответ на client */
const events = require("events");

const PORT = 5000;

const emitter = new events.EventEmitter();

/** создается экземпляр приложения из библиотеки express */
const app = express();

/** добавление cors-middleware */
app.use(cors());

/** endpoint для get-запроса: 1-й параметр это маршрут, 2-й параметр это callback кот. будет отрабатывать по 1-му маршруту (параметрами принимает запрос и ответ) */
app.get("/get-message", (req, res) => {
  /** осведомление участников чата, что пользователь отправил сообщение (т.к. метод once регистрирует событие "newMessage" и событие отрабатает лишь единожды) */
  emitter.once("newMessage", (message) => {
    /** возвращаем ответ на кликент (всем пользователям у которых висит подключение, возвращается это сообщение */
    res.json(message);
  });
});

/** endpoint для post-запроса: 1-й параметр это маршрут, 2-й параметр это callback кот. будет отрабатывать по 1-му маршруту (параметрами принимает запрос и ответ) */
app.post("/new-message", (req, res) => {
  const message = req.body;
  emitter.emit("newMessage", message);
  res.status(200);
});

/** слушатель 5000 порта, в случае успешного выполнения в логи будет выводиться сообщение */
app.listen(PORT, () => console.log(`server start on port ${PORT}`));
