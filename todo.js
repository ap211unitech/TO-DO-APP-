window.onload = () => {
    // console.log("Window loaded");
    display_all_notes();
}



//Function for Showing all Notes in WEBPAGE
all_notes_in_document = (value, key) => {
    document.getElementById("my-all-notes").innerHTML += `<div class="card mt-2 mb-4 mr-4" style="width: 21rem;height:auto" id=${key}>
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
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
            all_notes_in_document(items[i], keys[i]);
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
    if (Object.keys(localStorage).indexOf(String(count)) == -1) {


        localStorage.setItem(String(count), text);
        document.getElementById("text_area").value = "";

        if (document.getElementById("my-all-notes").innerHTML == `<h5 class="mt-4">Nothing to show! Use "Add Your Notes Here" section to add notes.</h5>`) {

            document.getElementById("my-all-notes").innerHTML = "";
            all_notes_in_document(text, count)

        } else {

            all_notes_in_document(text, count);

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
