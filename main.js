import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import getDate from "./date.js";
import { listCollection } from './models/listSchema.js';
import _ from "lodash";

const app = express()
const port = 3000

const connect = await mongoose.connect("mongodb://localhost:27017/toDoListDB")
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

let day = getDate();

let alreadyExistDB = await listCollection.findOne({ name: day });
if (!alreadyExistDB) {
    let todo = new listCollection({
        name: day,
        items: [{ toDoTask: "Default Task 1" }]
    });
    await todo.save();
}

app.get('/', async (req, res) => {
    let alreadyExistDB = await listCollection.find({ name: day })
    let items = alreadyExistDB[0].items;
    res.render("index", { listTitle: day, newListItems: items })
})

app.get('/:slug', async (req, res) => {
    const newPage = _.upperFirst(req.params.slug);
    let alreadyExistDB = await listCollection.find({ name: newPage })
    if (alreadyExistDB.length === 0) {
        const list = new listCollection({
            name: newPage
        })
        await list.save();
        res.redirect(`/${newPage}`);
    } else {
        let items = alreadyExistDB[0].items;
        res.render("index", { listTitle: newPage, newListItems: items })
    }
})

app.post("/", async (req, res) => {
    let item = req.body.newItem;
    let nameOfList = req.body.list;

    if (nameOfList.includes("Monday") || nameOfList.includes("Tuesday") || nameOfList.includes("Wednesday") || nameOfList.includes("Thursday") || nameOfList.includes("Friday") || nameOfList.includes("Saturday") || nameOfList.includes("Sunday")) {
        let temp = getDate();
        nameOfList = temp;
    }

    let alreadyExistDB = await listCollection.find({ name: nameOfList });

    if (alreadyExistDB.length !== 0) {
        await listCollection.findOneAndUpdate(
            { name: nameOfList },
            { $push: { items: { toDoTask: item } } }
        );
        res.redirect(`/${nameOfList}`);
    }
})

app.post("/delete", async (req, res) => {
    let checkedBox = req.body.checkbox;
    let listName = req.body.listName;

    let task = await listCollection.find({ name: listName })
    if (task.length !== 0) {
        await listCollection.findOneAndUpdate(
            { name: listName },
            { $pull: { items: { _id: checkedBox } } }
        );
        res.redirect(`/${listName}`)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})