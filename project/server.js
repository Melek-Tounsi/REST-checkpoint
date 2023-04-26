require('dotenv').config()
const express = require('express');
const usersRouter = require('./models/users')
const app = express();
const mongoose = require('mongoose');
const users = require('./models/users');
// console.log(process.env)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

run();

async function run() {
    try{
        const person= await users.create(
            {
                name : 'Melek',
                age : 17,
                favoriteFoods : ['tajiin','couscous']
            }
        )
        console.log(person)
    } 

    catch(e){ 

        console.log(e.message)
    }
}

app.use(express.json())

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected To Database'))

app.listen(3000, ()=> console.log("Server Started"))

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    })
    
    //Geting one
    router.get('/:id', getUser, (req, res) => {
        res.json(res.user)
    })
    
    //creating one
    router.post('/', async (req, res) => {
        const user = new User({
            name : req.body.name,
            subsribedToChannel : req.body.subsribedToChannel
        })
        try{
            const newUser = await user.save()
            res.status(201).json({newUser})
        }catch (err){
            res.status(400).json( { message: err.message } )
        }
    })
    
    //Updating One
    router.patch('/:id', getUser, async (req, res) => {
        if (req.body.name != null){
            res.user.name = req.body.name
        }
        if (req.body.subsribedToChannel != null){
            res.user.subsribedToChannel = req.body.subsribedToChannel
        }
        try {
        const updateUser = await res.user.save()
        res.json(updateUser)
        }catch (err){
            res.status(400).json( { message: err.message } )
        }
    })
    
    //Deleting One
    router.delete('/:id', getUser, async (req, res) => {
        try{
            await res.user.deleteOne()
            res.json({message: 'Deleted User'})
        } catch (err){
            res.status(500).json({ message: err.message})
        }
    })
    
