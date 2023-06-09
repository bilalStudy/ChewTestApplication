import {MongoClient, ObjectId} from "mongodb";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { UserApi } from "./api/userApi.js"
import {WebSocketServer} from "ws";
import {RecipeApi} from "./api/recipeApi.js";
import {AnnouncementApi} from "./api/announcementApi.js";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


const mongodburl = process.env.MONGODB_URL;

if(mongodburl){
    const client = new MongoClient(mongodburl);

    const mongoDbName = process.env.MONGODB_DATABASE || "smidigdb";

    client.connect().then(async (conn) => {
        app.use("/api/users", UserApi(conn.db(mongoDbName)));
        app.use("/api/recipe", RecipeApi(conn.db(mongoDbName)));
        app.use("/api/announcement", AnnouncementApi(conn.db(mongoDbName)))
    })
}


const sockets = [];

const wsServer = new WebSocketServer({noServer: true})

wsServer.on("connection", (socket) => {
    sockets.push(socket);
    socket.on("message", (message) => {
        console.log("There's a message" + message)
        for (const reciepient of sockets) {
            reciepient.send(message.toString());
        }
    })
});

/*
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        return res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});
*/

const server = app.listen(process.env.PORT || 3000,
    () => {
        console.log(`express server started on: http://localhost:${server.address().port}`)

        server.on("upgrade", (req, socket, head) => {
            wsServer.handleUpgrade(req, socket, head, (socket) => {
                console.log("connected");
                wsServer.emit("connection", socket, req)
            })
        })
    });