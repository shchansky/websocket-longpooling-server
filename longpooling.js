/** импорт библиотек */
const express = require("express");
const cors = require("express");

const PORT = 5000;

/** создается экземпляр приложения из библиотеки express */
const app = express();

/** слушатель 5000 порта, в случае успешного выполнения в логи будет выводиться сообщение */
app.listen(PORT, () => console.log(`server start on port ${PORT}`));
