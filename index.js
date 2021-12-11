const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3001

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const logger = (req, res, next) => {
    console.log("logger running")
    next()
};

const postChecker = (req, res, next) => {

    const spesiesReq = req.body["spesies"]
    const rule = ["kucing", "anjing", "kelinci"]
    
    const isExist = rule.find((e)=> spesiesReq == e) 

    if (isExist) {
        console.log("spesies exist");
        next()
    } else {
        res.status(400).send("spesies not valid")        
    }
}

app.use(logger)

let hewan = [
    {id: 1, nama: 'Snowy', spesies: 'kucing'},
    {id: 2, nama: 'Blacki', spesies: 'anjing'},
    {id: 3, nama: 'Molly', spesies: 'kucing'},
    {id: 4, nama: 'Milo', spesies: 'kelinci'},
    {id: 5, nama: 'Rere', spesies: 'kucing'},
  ]

app.get("/", (req, res)=>{
    res.status(200).send({
        message: "OK",    
        hewan
    })
})

app.get("/:id", (req, res)=>{
    const id = req.params.id
    const hewanDetail = hewan.filter((e)=> e.id == id)
    res.status(200).send({
        message: "OK",    
        hewanDetail
    })
})

app.post("/", postChecker , (req, res)=>{
    const body = req.body
    console.log(body);
    const newHewan = {
        id: hewan.length + 1,
        nama: req.body["nama"],
        spesies: req.body["spesies"]
    }
    hewan.push(newHewan)
    res.status(200).send(newHewan)
})

app.delete("/:id", (req, res)=>{
    const id = req.params.id
    const hewanDelete = hewan.filter((e)=> e.id !== 3)
    hewan.splice(0, hewan.length)
    hewan.push(hewanDelete)
    hewan = hewan.flat()
    res.status(200).send({
        message: "OK",    
        hewan
    })
})


app.listen(PORT, ()=>{
    console.log("Server connected at", PORT)
})