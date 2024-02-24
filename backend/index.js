const express = require("express");
const {sequelize, User, Post} =require("./db/db.js");
const cors = require("cors");
const {Parser} = require("json2csv");
require('dotenv').config()
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

app.post('/addUser', async (req, res) => {
    const userData = req.body;
    try {
        // Check if user already exists in the database
        const existingUser = await User.findOne({ where: { id: userData.id }});

        if (existingUser===null) {
        const newUser = await User.create({
            id:userData.id,
            name:userData.name,
            email:userData.email,
            phone:userData.phone,
            website:userData.website,
            city:userData.email,
            company:userData.address.city
        });
        res.status(201).send({
            status:201,
            message:"user saved successfully"
        })
        }
        else{
            res.status(200).send({
                status:200,
                message:" user already exists"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(400).send({
            status:400,
            message:"Unable to add user",
            error:err
    });
    }
    });

app.post("/posts/:userId", async (req,res) => {
    const id = Number(req.params.userId);
    const postsData = req.body;
    try{
        const existingPosts = await Post.findAll({where: {userId : id}});
        
        if(existingPosts.length===0){
            await Post.bulkCreate(postsData);
            res.status(201).send({
                status:201,
                message:"posts saved successfully"
            })
        }
        else{
            res.status(200).send({
                status:200,
                message:" posts already exists"
            })
        }
    }
    catch(err){
        res.status(400).send({
            status:400,
            message:"Unable to add posts",
            error:err
        })
    }
})


app.get(`/:userId/download`, async (req,res) => {
    const userId = Number(req.params.userId);
    try{
        const data = [];
        const Posts = await Post.findAll({where: {userId : userId}});
        Posts.forEach((post) => {
            const {userId, id, name, title,body, company} = post;
            data.push({userId,id,name,title,body,company});

        })
        console.log(Posts)
        const csvFields = ["userId", "id", "name", "title", "body", "company"];
        const csvParser = new Parser({csvFields});
        const csvData = csvParser.parse(data);
        res.setHeader("Content-Type","text/csv");
        res.setHeader("Content-Disposition","attachment: filename=posts.csv");
        res.status(200).end(csvData)
    }
    catch(err){
        res.status(400).send({
            status:400,
            message:"unable to download",
            error:err.message
        })
    }
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync()
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})