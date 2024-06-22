const http = require('node:http')
const url = require('node:url')
const fs = require('node:fs')

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true)
  if (path.path == '/favicon.ico') return res.end()
  const fileName = path.path === '/' ? './index.html' : `.${path.path}.html`
  console.log(`Request: ${path.pathname}`)
  fs.readFile(fileName, 'utf-8', (err, data) => {
    if (!err) { 
      console.log(`Success request: ${fileName}`,  '\n---------------')
      res.end(data)
    } else {
      console.log(`Error: ${fileName}`,  '\n---------------')
      fs.readFile('404.html', 'utf-8', (err, errorPage) => {
        res.end(errorPage)
      })
    }
  })  
}) 
server.listen(3000, (e) => {
  console.log(`Server running on: http://localhost:3000`)
})