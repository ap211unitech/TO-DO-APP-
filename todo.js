window.onload = () => {
    display_all_notes();
}


//Function for Showing all Notes in WEBPAGE
all_notes_in_document = (tt, value, key) => {
    document.getElementById("my-all-notes").innerHTML += `<div class="noteCard card mt-2 mb-4 mr-4" style="width: 20.9rem;" id=${key}>
        <div class="card-body">
            <h5 class="card-title">${tt}</h5>
            <p class="card-text">${value}</p>
            <a class="btn btn-primary" id="delete_note" onclick=delete_note(${key})>Delete Note</a>
        </div>
    </div>`
}



display_all_notes = () => {
    document.getElementById("my-all-notes").innerHTML = ""
    let orderArray = [];
    //All Values from Localstorage
    let items = Object.values(localStorage);
    let keys = Object.keys(localStorage);

    for (let index = 0; index < keys.length; index++) {
        orderArray[keys[index]] = items[index];
    }
    orderArray = orderArray.filter(elm => {
        return elm != null
    })

    keys = keys.sort()

    if (orderArray.length > 0) {
        for (let i = 0; i < orderArray.length; i++) {
            let perfectItem = JSON.parse(orderArray[i]);
            if (perfectItem.title != undefined || perfectItem.title != null || perfectItem.text != undefined || perfectItem.text != null) {
                all_notes_in_document(perfectItem.title, perfectItem.text, keys[i]);
            }
        }
    } else {
        // console.log("Empty localstorage");
        document.getElementById("my-all-notes").innerHTML = `<h5 class="mt-4">Nothing to show! Use "Add Your Notes Here" section to add notes.</h5>`;
    }
}
let count = Object.keys(localStorage).sort().reverse()[0] === undefined ? 0 : Number(Object.keys(localStorage).sort().reverse()[0]) + 1;


//Adding a note
document.getElementById("add_note").addEventListener("click", () => {
    let text = (document.getElementById("text_area").value).trim();
    let note_title = (document.getElementById("note_title").value).trim();
    if (text == null || text == undefined || text.length == 0 || note_title == null || note_title == undefined || note_title.length == 0) {
        alert("Note's text and Title may not be empty");
        return;
    }
    if (Object.keys(localStorage).indexOf(String(count)) == -1) {

        localStorage.setItem(String(count), JSON.stringify({ title: note_title, text: text }));
        document.getElementById("text_area").value = "";
        document.getElementById("note_title").value = "";

        if (document.getElementById("my-all-notes").innerHTML == `<h5 class="mt-4">Nothing to show! Use "Add Your Notes Here" section to add notes.</h5>`) {

            document.getElementById("my-all-notes").innerHTML = "";

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
    localStorage.removeItem(key);
    display_all_notes();
}

//Searching a Note
document.getElementById("search").addEventListener("input", () => {

    let inputVal = document.getElementById("search").value.toLowerCase();
    let allcards = document.getElementsByClassName("noteCard");

    Array.from(allcards).forEach(element => {
        const cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        const cardContent = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardContent.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });

})

