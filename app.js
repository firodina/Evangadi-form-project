
const express = require("express")
const app = express()
//importing the userRoute middleware
const route = require('./routes/userRoute')
const port = 5050

//db connection 
const dbconnection = require('./db/dbConfig')


//use the middleware route
app.use('/api/user', route)

async function start() {
  try {
    const result = await dbconnection.execute("select 'test' ")
    // await app.listen(port)
    console.log(`listening to ${port}`)
    console.log('database connected')
  } catch (error) {
    console.log(error.message)
  }
}
start()

app.get('/', (req, res) => {
  res.send("wellcome")
})

// app.listen(port, (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(`listening to ${port}`)
//   }
// })