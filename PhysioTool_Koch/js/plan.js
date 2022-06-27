const btnGet = document.getElementById("btnGet");
const btnSend = document.getElementById("btnSend");

async function getFromServer(url) {
    const response = await fetch(url);
    const content = await response.json();
    console.log(content);
}

btnGet.addEventListener("click", () => {
    getFromServer("http://localhost:3000/plan");
});

btnSend.addEventListener("click", () => {
    alert("Der Plan wurde abgeschickt.");
});