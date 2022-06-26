async function sendJSONStringWithPOST(url, jsonString) {
    const response = await fetch(url, {
        method: "post",
        body: jsonString,
    });
}

sendJSONStringWithPOST(
    "http://localhost:3000/",
    JSON.stringify({ test: "Dies ist ein Test" })
);