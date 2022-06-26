const http = require("http");
const mongodb = require("mongodb");

const hostname = "127.0.0.1"; // localhost
const port = 3000;
const url = "mongodb://localhost:27017"; // für lokale MongoDB
const mongoClient = new mongodb.MongoClient(url);

async function startServer() {
    // connect to database
    await mongoClient.connect();
    // listen for requests
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
    let url = new URL(request.url || " ", `http://${request.headers.host}`);
    switch (url.pathname) {
    case "/plan": {
        console.log("/plan wurde aufgerufen");
        const exercisesCollection = mongoClient.db("plan").collection("exercises");
        switch (request.method) {
        case "POST":
            let jsonString = " ";
            request.on("data", data => {
                jsonString += data;
            });
            request.on("end", async () => {
                console.log(JSON.parse(jsonString));
                exercisesCollection.insertOne(JSON.parse(jsonString));
            });
            break;
        case "GET":
            const result = await exercisesCollection.find({}).toArray();
            response.end(JSON.stringify(result));
        }
        break;
    }

    case "/clearAl":
        await mongoClient.db("plan").collection("exercises").drop();
        break;
    default:
        response.statusCode = 404;
    }
    response.end();
}
);

startServer();

