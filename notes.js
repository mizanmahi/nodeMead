const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = titleForRemove => {
    const notes = loadNotes();
    if (notes.length > 0){
        const filteredNotes = notes.filter(note => {
            return note.title !== titleForRemove;
        });
        saveNotes(filteredNotes);
        if(notes.length > filteredNotes.length){
            console.log(chalk.green('Item was removed'));
        } else if (notes.length === filteredNotes.length){
            console.log(chalk.red('No such note found'));            
        }
    } else {
        console.log(chalk.red('No such note found'));
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}