// HTMLElement Definitionen
const enterbutton = document.querySelector("#enter-button");
const interpretInput = document.querySelector("#interpret-input");
const priceInput = document.querySelector("#price-input");
const dateInput = document.querySelector("#datetime-input");
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
    deleteButton.textContent = "Delete Event";
    // gib dem Button die passenden HTML-Klassen
    deleteButton.classList.add("delete-button", "ui", "button", "negative");
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
* Funktion erstellt eine einzelnen Tabellenzelle mit der entsprechenden Value
* @param {object} object das Objekt aus dem ein neues Element erstellt werden soll (optional)
*/
function createNewEventEntry(object) {
    // Element für Tabellenreihe anlegen
    const tableEntry = document.createElement("tr");
    // Addressierung durch eine entsprechende Klasse
    tableEntry.classList.add("table-entry");
    let interpret;
    let price;
    let datetime;
    // Auslesen der Input-Werte
    if (object) {
        interpret = object.interpret;
        price = object.price;
        datetime = object.datetime;
    } else {
        interpret = interpretInput.value;
        price = Number(priceInput.value);
        datetime = dateInput.value;
    }

    // Validierung der Input-Werte
    if (!validation(interpret, price, datetime)) {
        return;
    }

    // lege die einzelnen Tabellenzellen an
    const cells = [
        createTableCell(interpret, "data-interpret"),
        createTableCell(price.toString(), "data-price"),
        createTableCell(datetime, "data-date"),
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
* @param {String} interpret Der Wert im Interpret-Eingabefeld
* @param {Number} price Der Wert im Preis-Eingabefeld
* @param {String} datetime Der Wert im Datum-Eingabefeld
* @return {Boolean} Gibt true zurück, wenn die Eingaben valide sind
*/
function validation(interpret, price, datetime) {
    // Schaue, dass alle Inputfelder befüllt sind
    if (!interpret || !price || !datetime) {
        alert("Please fill out all input fields!");
        return false;
    }
    // Schaue, dass der Preis vom Typ Number ist
    if (isNaN(price)) {
        alert("Price Input is not a Number");
        return false;
    }
    return true;
}

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
        // Sinnvoll ist es für Zellenelement z.B. ein entprechendes Data-Attribut zu definieren
        /* Damit es keine Verwechselungen gibt. Suche ich nur für die aktuelle Tabellenzeile
           das Element mit dem entsprechenden Data-Attribut heraus */

        const interpretElement = entry.querySelector("[data-interpret]");
        const priceElement = entry.querySelector("[data-price]");
        const dateElement = entry.querySelector("[data-date]");

        // auslesen der Werte, der einzelnen Zellen
        const interpret = interpretElement.dataset.interpret;
        const price = Number(priceElement.dataset.price);
        const date = dateElement.dataset.date;

        // Speicher der Attribute, im Events-Array
        currentTableEntries.push({
            interpret: interpret,
            price: price,
            datetime: date
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