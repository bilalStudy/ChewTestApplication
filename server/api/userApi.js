import bcrypt from 'bcrypt';
import express, {request} from "express";
import {ObjectId} from "mongodb";

export function UserApi(db){
    const api = express.Router();
/*
    api.post('/register', async (req, res) => {
            const {username, fullname, password, role} = req.body

            if (!username || username.length == 0) {
                res.sendStatus(500);
                return;
            }


            if (!fullname || fullname.length == 0) {
                res.sendStatus(500);
                return;
            }

            if (!password || password.length == 0) {
                res.sendStatus(500);
                return;
            }

            if (!role || role.length == 0) {
                res.sendStatus(500);
                return;
            }

            const users = await db.collection("users")
                .find({ username: username })
                .toArray();

            if (users.length > 0) {
                res.sendStatus(500);
                return;
            }

            bcrypt.hash(password, 10, function(err, hash) {
                if (err) {
                    // handle error
                    res.sendStatus(500);
                    return;
                }
            
                const result = db.collection("users").insertOne({
                    username,
                    fullname,
                    password: hash, // store the hashed password
                    role,
                });
            
                res.sendStatus(200);
            });
            

            res.sendStatus(200);
        })
*/
        api.post('/login', async (req, res) => {
            const {username, password} = req.body;
        
            const users = await db.collection("users")
                .find({username: username})
                .toArray();
        
            if (users.length > 0){
                const user = users[0];
        
                bcrypt.compare(password, user.password, function(err, result) {
                    if (result) {
                        // Passwords match
                        res.json({
                            cookie : user._id.toString(),
                            user: user,
                        })
                    } else {
                        // Passwords don't match
                        res.sendStatus(403);
                    }
                });
            } else {
                res.sendStatus(404);
            }
        })
    
        api.get('/logged-in', async (req,res) => {
            if (!req.cookies.user || req.cookies.user.length == 0) {
                res.sendStatus(403);
                return;
            }

            const user = await db.collection("users")
                .findOne({ _id: new ObjectId(req.cookies.user) });

            if (!user) {
                res.sendStatus(404);
                return;
            }

            res.send(user);
        })

        api.get("/:school/:role", async (req, res) => {
            console.log(req.params.school)
            console.log(req.params.role)

            const listAllPupilsFromSchool = await db.collection("users")
                .find({school: req.params.school, role: req.params.role}).toArray();


            console.log(listAllPupilsFromSchool)

            res.json(listAllPupilsFromSchool)
        }),


        api.get("/", async (req, res) => {
            /*
            const managerId = req.cookies.manager;

            if (!managerId) {
                res.sendStatus(403);
                return;
            }
            */

            const listAllUsers = await db.collection("users")
                .find()
                .map(({ _id,username, fullname, password, role, gradeclass, school}) => ({
                    id: _id,
                    username,
                    fullname,
                    password,
                    role,
                    gradeclass,
                    school,
                }))
                .toArray();

            res.json(listAllUsers)
        })

    return api;
}