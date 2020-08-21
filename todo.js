window.onload = () => {
    // console.log("Window loaded");
    display_all_notes();
}

// let titles = [];

//Function for Showing all Notes in WEBPAGE
all_notes_in_document = (tt, value, key) => {
    document.getElementById("my-all-notes").innerHTML += `<div class="noteCard card mt-2 mb-4 mr-4" style="width: 21rem;height:auto" id=${key}>
        <div class="card-body">
            <h5 class="card-title">${tt}</h5>
            <p class="card-text">${value}</p>
            <a href="#" class="btn btn-primary" id="delete_note" onclick=delete_note(${key})>Delete Note</a>
        </div>
    </div>`
}



display_all_notes = () => {
    document.getElementById("my-all-notes").innerHTML = ""

    //All Values from Localstorage
    let items = Object.values(localStorage);
    let keys = Object.keys(localStorage);
    if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            let perfect_item = JSON.parse(String(items[i]));
            // console.log(perfect_item)
            all_notes_in_document(perfect_item.title, perfect_item.text, keys[i]);
        }
    } else {

        // console.log("Empty localstorage");
        document.getElementById("my-all-notes").innerHTML = `<h5 class="mt-4">Nothing to show! Use "Add Your Notes Here" section to add notes.</h5>`;

    }
}
let count = Object.keys(localStorage).sort().reverse()[0] === undefined ? 0 : Number(Object.keys(localStorage).sort().reverse()[0]) + 1;

// console.log(count)

//Adding a note
document.getElementById("add_note").addEventListener("click", () => {
    let text = document.getElementById("text_area").value;
    let note_title = document.getElementById("note_title").value;
    if (Object.keys(localStorage).indexOf(String(count)) == -1) {

        // titles.push(note_title);
        localStorage.setItem(String(count), JSON.stringify({ title: note_title, text: text }));
        document.getElementById("text_area").value = "";
        document.getElementById("note_title").value = "";

        if (document.getElementById("my-all-notes").innerHTML == `<h5 class="mt-4">Nothing to show! Use "Add Your Notes Here" section to add notes.</h5>`) {

            document.getElementById("my-all-notes").innerHTML = "";
            // all_notes_in_document(text, count)
            display_all_notes();

        } else {

            // all_notes_in_document(text, count);
            display_all_notes();

        }

        // display_all_notes();
        count++;
    }
});


//Deleting a Note
function delete_note(key) {
    // console.log("Note deleted", key);
    localStorage.removeItem(key);
    display_all_notes();
}

//Searching a Note
document.getElementById("search").addEventListener("input", () => {

    // console.clear()

    // console.log("search");

    let inputVal = document.getElementById("search").value.toLowerCase();

    let allcards = document.getElementsByClassName("noteCard");

    Array.from(allcards).forEach(element => {
        if (element.getElementsByTagName("p")[0].innerText.toLowerCase().includes(inputVal)) {

            element.style.display = "block";

        }

        else {

            element.style.display = "none";
        }
        // console.log(element.getElementsByTagName("p")[0].innerText,inputVa)
    });

})


// console.log(titles)