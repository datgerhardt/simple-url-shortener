require('dotenv').config()

const express = require('express')
const cors = require('cors')
const config = require('./config')
const crypto = require('crypto')
const mongoose = require('mongoose')
const Url = require('./models/url')

console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.info('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })


const app = express() 
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1> URL shorter </h1>')
})

app.get('/:id', async (req, res) => {
  const uid = req.params.id
  const urlObj = await Url.findOne({uId:uid})

  if (!urlObj){
    res.status(404).end()
  }

  let url = urlObj.url.startsWith('http') ? urlObj.url : `http://${urlObj.url}`
  res.redirect(url)

})

app.post('/', async (req, res) => {
  uid = makeId(8)
  body = req.body.url
  let hash =  crypto.createHash('md5').update(body).digest("hex")
  console.log(hash)
  const url = await Url.create({uId: uid, url:body})
  console.log(url)

  res.json(url)
})


const makeId = (length) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.listen(config.PORT, () => {
  console.log(`Running on port ${config.PORT}`) 
  })
