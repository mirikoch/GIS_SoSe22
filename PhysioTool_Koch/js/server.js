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
        const planCollection = mongoClient.db("physiotool").collection("plan");
        switch (request.method) {
        case "GET":
            let result;
            if (url.searchParams.get("series")) {
                result = await planCollection.find({
                    series: Number(url.searchParams.get("series"))
                });
            }
            else {
                result = await planCollection.find({});
            }
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result.toArray()));
            break;
        case "POST":
            let jsonString = " ";
            request.on("data", data => {
                jsonString += data;
            });
            request.on("end", async () => {
                console.log(JSON.parse(jsonString));
                planCollection.insertOne(JSON.parse(jsonString));
            });
            break;
        }
        break;
    }

    case "/clearAl":
        await mongoClient.db("physiotool").collection("plan").drop();
        break;
    default:
        response.statusCode = 404;
    }
    response.end();
}
);

startServer();

