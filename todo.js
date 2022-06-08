

/*
DOM for a single Note
*/

const note = (title, text, index, date) => {
    document.getElementById("my-all-notes").innerHTML += `<div class="noteCard card mt-2 mb-4 mr-4" style="width: 20.9rem;">
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
            <p class="card-text" style="white-space: pre-wrap;">${text}</p>
            <div class="d-flex justify-content-between align-items-center">
                <a class="btn btn-primary" id="delete_note" onclick=deleteNote(${index})>Delete Note</a>
                <p class="mt-3 text-primary font-italic">-- ${date}</p>
            </div>
        </div>
    </div>`
}



/*
    Display all Notes
*/

const displayAllNotes = () => {
    let allNotes = JSON.parse(localStorage.getItem("notes"));
    if (allNotes == null) {
        document.getElementById("emptyNotes").style.display = "block";
    } else {
        document.getElementById("emptyNotes").style.display = "none";
        for (let index = 0; index < allNotes.length; index++) {
            const element = JSON.parse(allNotes[index]);
            note(element.noteTitle, element.noteText, index, element.date);
        }
    }
}


/*
Add a Note
*/

const addNote = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let noteTitle = document.getElementById("noteTitle").value.trim();
    let noteText = document.getElementById("noteText").value.trim();
    let allNotes = localStorage.getItem("notes");

    // Validators
    if (noteTitle == null ||
        noteTitle == undefined ||
        noteTitle.length == 0 ||
        noteText == null ||
        noteTitle == undefined ||
        noteText.length == 0
    ) {
        alert("Note's Title or Text may not be empty");
        return;
    }

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteText").value = "";
    let currentDate = `${months[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().toLocaleTimeString()}`;


    if (allNotes == null || allNotes == undefined) {
        let noteData = {
            noteTitle: noteTitle,
            noteText: noteText,
            date: currentDate
        }
        let notesArray = [];
        notesArray.push(JSON.stringify(noteData));
        localStorage.setItem("notes", JSON.stringify(notesArray));
    }

    else {
        let noteData = {
            noteTitle: noteTitle,
            noteText: noteText,
            date: currentDate
        }
        let notesArray = JSON.parse(localStorage.getItem("notes"));
        notesArray.push(JSON.stringify(noteData));
        localStorage.setItem("notes", JSON.stringify(notesArray));
    }

    document.getElementById("my-all-notes").innerHTML = "";
    displayAllNotes();
}



/*
    Delete a Note
*/

const deleteNote = (index) => {
    let allNotes = JSON.parse(localStorage.getItem("notes"));
    allNotes.splice(index, 1);
    if (allNotes != null && allNotes != undefined && allNotes.length != 0) {
        localStorage.setItem("notes", JSON.stringify(allNotes));
    }
    else {
        localStorage.removeItem("notes");
    }

    document.getElementById("my-all-notes").innerHTML = "";
    displayAllNotes();
}

/*
    Search a Note
*/

document.getElementById("search").addEventListener("input", () => {

    let inputVal = document.getElementById("search").value.toLowerCase();
    let allcards = document.getElementsByClassName("noteCard");

    Array.from(allcards).forEach(element => {
        const cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        const cardContent = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        const cardDate = element.getElementsByTagName("p")[1].innerText.toLowerCase();
        if (cardContent.includes(inputVal) || cardTitle.includes(inputVal) || cardDate.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });

})

document.getElementById("addNote").addEventListener("click", addNote);
window.onload = displayAllNotes();

