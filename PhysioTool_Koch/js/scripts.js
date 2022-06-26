// Pop-Up Details-Button
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

//Hinzufügen-Button
// HTMLElement Definitionen
const enterbutton = document.querySelector("#enter-button");
const seriesInput = document.querySelector("#series");
const repInput = document.querySelector("#repetition");
const dauerInput = document.querySelector("#dauer");
const commentInput = document.querySelector("#comment");
const tableBody = document.querySelector("#table-body");

// EventHandler für Enter-Button
enterbutton.addEventListener("click", enterEvent);

/**
* Funktion für die Eventlistner der einzelnen Lösch-Buttons
* @param {Event} evt
* @param {HTMLElement} parentElement
*/
function handleDelete(evt, parentElement) {
    tableBody.removeChild(parentElement);
    // update data and localstorage
    saveConcertEvents();
}

// Bauplan für die Zeile des Löschbuttons

/**
* Bauplan für die Zeile des Löschbuttons
* @param {HTMLElement} parentElement
* @return {HTMLElement} die Zeile des Löschbuttons
*/
function createDeleteButtonCell(parentElement) {
    // lege eine neue Tabellenzelle und einen neuen Button an
    const tablecell = document.createElement("td");
    const deleteButton = document.createElement("button");
    // Füllen des Buttons mit Inhalt
    deleteButton.textContent = "Entfernen";
    // gib dem Button die passenden HTML-Klassen
    deleteButton.classList.add("btn-danger");
    // Füge einen Eventlistener dem Löschbutton hinzu
    deleteButton.addEventListener("click", function(evt) {
        evt.preventDefault();
        handleDelete(evt, parentElement);
    });
    // füge in die Tabellenzelle den Löschbutton ein
    tablecell.appendChild(deleteButton);
    // gebe die Tabellenzelle zurück
    return tablecell;
}

/**
* Funktion erstellt eine einzelnen Tabellenzelle mit der entsprechenden Value
* @param {string} value
* @param {string} name
* @return {HTMLElement} die Zeile des Löschbuttons
*/
function createTableCell(value, name) {
    const tablecell = document.createElement("td");
    tablecell.setAttribute(name, value);
    tablecell.textContent = value;
    return tablecell;
}

/**
* Funktion erstellt eine einzelne Tabellenzelle mit der entsprechenden Value
* @param {object} object das Objekt aus dem ein neues Element erstellt werden soll (optional)
*/
function createNewEventEntry(object) {
    console.log("createNewEventEntry aufgerufen");

    // Element für Tabellenreihe anlegen
    const tableEntry = document.createElement("tr");
    // Addressierung durch eine entsprechende Klasse
    tableEntry.classList.add("table-entry");
    let series;
    let rep;
    let dauer;
    let comment;
    // Auslesen der Input-Werte
   
    console.log(object);
    if (object) {
        series = object.series;
        rep = object.rep;
        dauer = object.dauer;
        comment = object.comment;
    } else {
        series = Number(seriesInput.value);
        rep = Number(repInput.value);
        dauer = Number(dauerInput.value);
        comment = commentInput.value;
    }

    /*
    // Validierung der Input-Werte
    if (!validation(series, rep, dauer, comment)) {
        return;
    }*/

    // lege die einzelnen Tabellenzellen an
    const cells = [
        createTableCell(series, "series"),
        createTableCell(rep, "repetition"),
        createTableCell(dauer, "dauer"),
        createTableCell(comment, "comment"),
        createDeleteButtonCell(tableEntry)
    ];

    // füge die einzelnen Tabellenzellen der Tabellenreihe hinzu
    for (const cell of cells) {
        tableEntry.appendChild(cell);
    }

    // pflege die gesamte Tabellenreihe in die Tabellenstruktur ein
    tableBody.appendChild(tableEntry);
}


/**
* Funktion validiert die Eingabefelder "Interpret", "Preis" und "Datum"
* @param {Number} series Der Wert im Serien-Eingabefeld
* @param {Number} rep Der Wert im Wdh-Eingabefeld
* @param {Number} dauer Der Wert im Dauer-Eingabefeld
* @param {String} comment Der Wert im Kommentar-Eingabefeld
* @return {Boolean} Gibt true zurück, wenn die Eingaben valide sind
*/

// EventHandler für Enter-Button
function enterEvent(_evt) {
    _evt.preventDefault();
    createNewEventEntry();
    saveConcertEvents();
}

/**
 * Funktion zum aktualisieren des Events-Arrays im Local Storage
 */
 function saveConcertEvents() {
    // suche zuächst die TabellenEinträge aus dem DOM heraus.
    const tableEntries = document.querySelectorAll(".table-entry");

    // initialisiere das Events-Array neu
    const currentTableEntries = [];
    // lese für jeden Tabelleneintrag die Werte aus
    for (const entry of tableEntries) {
        const seriesElement = entry.querySelector("[series]");
        const repElement = entry.querySelector("[repetition]");
        const dauerElement = entry.querySelector("[dauer]");
        const commentElement = entry.querySelector("[comment]");

        // auslesen der Werte, der einzelnen Zellen
        const series = Number(seriesElement.dataset.series);
        const rep = Number(repElement.dataset.rep);
        const dauer = Number(dauerElement.dataset.dauer);
        const comment = commentElement.dataset.comment;

        // Speicher der Attribute, im Events-Array
        currentTableEntries.push({
            series: series,
            rep: rep,
            dauer: dauer,
            comment: comment
        });
    }

    /* Nachdem diese For-Schleife durchgelaufen ist,
    ist das Events-Array wieder auf dem aktuellsten Stand */
    localStorage.setItem("event_storage", JSON.stringify(currentTableEntries));
}

/**
 * Funktion zum aktuallisieren der Tabelle
 */
function updateView() {
    // Hole die Daten aus dem LocalStorage
    const storageString = localStorage.getItem("event_storage");
    // konvertiere die Daten zurück in ein Objekt und ersätz damit das Events-Array
    const currentTableEntries = JSON.parse(storageString);
    // schaue zunächst ob es Einträge gibt, wenn Nein, springe aus der Funktion
    if (!currentTableEntries) {
        return;
    }
    // interiere die Tabellenelemente und erstelle für jedes Element einen Tabelleneintrag
    for (const element of currentTableEntries) {
        createNewEventEntry(element);
    }
}

/**
 * Init Funktion aktualisiert die Ansicht
 */
function init() {
    updateView();
}

// Init-Funktion aufrufen
init();


const title = document.getElementById("shop-item-title");
const image = document.getElementById('shop-item-image');
const series = document.getElementById('series');
const repetition = document.getElementById('repetition');
const dauer = document.getElementById('dauer');
const comment = document.getElementById('comment');

let exercises = [];


const addExercise = (e) => {
    console.log("addExcercise() wurde aufgerufen");
    e.preventDefault();

    const titleInput = title.textContent;
    const imageInput = image.src;
    const seriesInput = series.value;
    const repetitionInput = repetition.value;
    const dauerInput = dauer.value;
    const commentInput = comment.value;

    let exercise = {
        title: titleInput,
        image: imageInput,
        series: seriesInput,
        repetition: repetitionInput,
        dauer: dauerInput,
        comment: commentInput
    };
    console.log(exercise);

    sendJSONStringWithPOST(
        'http://localhost:3000/plan',
        JSON.stringify(exercise)
    );

    exercises.push(exercise);
    document.querySelector('input').reset;

    // send json data to localstorage
    localStorage.setItem('ExerciseArray', JSON.stringify(exercises));

    console.log(JSON.parse(localStorage.getItem('ExerciseArray')));
    displayExercise();
};


function displayExercise() {
    let exerciseArray = JSON.parse(localStorage.getItem('ExerciseArray'));
    console.log(exerciseArray);

    for (let i = 0; i < exerciseArray.length; i++) {
        let plan = `
          <div class="cart-item cart-column">
          <img class="cart-item-image" src="${document.getElementById('shop-item-image').src}
            " width="100" height="100">
          <span class="dropdown-cart-item-title"> 
            ${document.getElementById('shop-item-title').textContent} </span>
          </div>

          <div class="cart-quantity cart-column">
              <button class="btn btn-danger" type="button">ENTFERNEN</button>
          </div> 
      `;
        plan.innerHTML += plan;
    }
} 


const btns = document.getElementsByClassName('shop-item-button');

for (btn of btns) {
    btn.addEventListener("click", addExercise);
}


// Server-Funktionen
async function sendJSONStringWithPOST(url, jsonString) {
    const response = await fetch(url, {
        method: "post",
        body: jsonString,
    });
    const text = await response.text();
    console.log(JSON.parse(text));
}