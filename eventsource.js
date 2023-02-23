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
/** подключение json-parser */
app.use(express.json());

/** endpoint для get-запроса: 1-й параметр это маршрут, 2-й параметр это callback кот. будет отрабатывать по 1-му маршруту (параметрами принимает запрос и ответ) */
app.get("/connect", (req, res) => {
  /** первым параметром передаем статус-код, вторым указывем заголовки */
  res.writeHead(200, {
    /** держать подключение */
    Connection: "keep-alive",
    /** формат обмена данными -выбираем строки */
    "Content-Type": "text/event-stream",
    /** указываем чтобы нечего не кэшировалось */
    "Cache-Control": "no-cashe",
  });
  emitter.on("newMessage", (message) => {
    /** сообщенеи с пом. ф-ии write возвращаем на клиент */
    res.write(message);
  });
});

/** endpoint для post-запроса: 1-й параметр это маршрут, 2-й параметр это callback кот. будет отрабатывать по 1-му маршруту (параметрами принимает запрос и ответ) */
app.post("/new-message", (req, res) => {
  const message = req.body;
  emitter.emit("newMessage", message);
  res.status(200);
});

/** слушатель 5000 порта, в случае успешного выполнения в логи будет выводиться сообщение */
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
