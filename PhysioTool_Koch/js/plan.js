const btnSend = document.getElementById("btnSend");

async function getFromServer(url) {
    const response = await fetch(url);
    const content = await response.json();
    console.log(content);
}

btnSend.addEventListener("click", () => {
    getFromServer("http://localhost:3000/plan");
});