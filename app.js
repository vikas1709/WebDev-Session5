const express = require('express') 
const bodyParser = require('body-parser') 
const app = express() 
const port = 9000

// app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://dannyboynyc:dd2345@ds149329.mlab.com:49329/bcl2', (err, database) => {
	db = database

})

app.listen(port, () => {
	console.log(`Listening on port ${port}!`)
})

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})












