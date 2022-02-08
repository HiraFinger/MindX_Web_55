const express = require("express");

const router = require("./routers");

const { connectToDb } = require("./database");

const app = express();
const port = 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("assets"));

app.use(router);

connectToDb();

app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});
