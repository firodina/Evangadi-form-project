const msql = require('mysql2')

const dbconnection = msql.createPool({
  user: "evangadi-admin",
  database: "evagadi-db",
  host: "localhost",
  password: "123456",
  connectionLimit:10
})

// dbconnection.execute("select 'test' ", (err, result) => {
//   if (err) {
//     console.log(err.message)
//   } else {
//     console.log(result)
//   }
// })

module.exports = dbconnection.promise()