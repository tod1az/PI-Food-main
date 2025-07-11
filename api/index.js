const server = require('./src/app.js')
const { conn } = require('./src/db.js')

// Syncing all the models at once.
conn.sync().then(() => {
  server.listen(3001, () => {
    console.log('Listening at 3001') // eslint-disable-line no-console
  })
})
