const express = require('express')
const mongodb = require('mongodb')

const connectionURL = 'mongodb://localhost:27017'
const databaseName = 'myduties'

const app = express()
const MongoClient= mongodb.MongoClient

app.use(
    express.urlencoded({
        extended: true
    })
)
app.get('',(req,res)=> {
    res.send('Hello, I am your NodeJS server! :)')
})

app.get('/about',(req,res)=> {
    res.send('<h1>Server: my duties</h1>')
})

app.get('/hi',(req,res)=> {
    res.send('<h1>Hello there</h1>')
})

app.get('/author',(req,res)=> {
    res.send({'firstname':'Dominika','lastname':'Erdelyiova'})
})

app.get('/duty',(req,res)=> {
    MongoClient.connect(connectionURL, (error, client) => {
        if(error){
            return console.log('Unable to connect to database:(')
        }
        console.log('Connection succesfull')
        let filter ={};
        if(req.query.done){
            if(req.query.done=='true')
            filter.done=true;
            else
            filter.done=false;
        }else if(req.query.priority){
            filter.priority=parseInt(req.query.priority);

        }
        console.log(filter)
        
        const db=client.db(databaseName)


        db.collection('tasks').find(filter).toArray( (err,result)=> {
            if(err) throw err;
            console.log(result);
            res.send(result);

    })
})

})

app.post('/task/new', (req,res)=> {
    const data = req.body;
    const name = data.name;
    const priority = data.priority;
    let price = 'undefined'
    if(data.price){
        price=data.price;
    }
    console.log(name, '', priority, '', price)
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})


