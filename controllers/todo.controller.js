
const firebase = require('../db');
const ToDo = require('../models/todo');
const firestore = firebase.firestore();
const collectionName = 'todos';
const getAllToDos = async (req, res, next) => {
    try {
        const toDos = await firestore.collection(collectionName);
        const data = await toDos.get();
        const toDoArray = [];
        if (data.empty) {
            res.status(404).send('No to do record found');
        } else {
            data.forEach(doc => {
                const toDo = new ToDo(
                    doc.id,
                    doc.data().title,
                    doc.data().isCompleted,
                    doc.data().createdAt.toDate().toDateString(),
                    doc.data().updatedAt.toDate().toDateString()
                );
                toDoArray.push(toDo);
            });
            res.send(toDoArray);
        }
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(400).send(error.message);
    }
}


const updateToDo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const toDo = await firestore.collection(collectionName).doc(id);
        data.updatedAt = new Date();
        await toDo.update(data);
        res.send('To Do record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllToDos,
    updateToDo
}