const { MongoClient } = require("mongodb");

const db = {};

const connectToDb =async () => {
    const mongoClient = new MongoClient(
        "mongodb+srv://admin:admin123@cluster0.ztykm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        );
    await mongoClient.connect()
    console.log("DB Connected")
    const database=mongoClient.db("mindx_web_55")
    db.students=database.collection("students");
    db.teachers=database.collection("teachers");
    db.users=database.collection("users");
};

module.exports = { db, connectToDb };
