const express = require('express')
const app = express()
const cors = require('cors');
const fs = require('fs')
const path = require('path')

const port = 6070

app.use(cors({ origin: true, credentials: true })); // no more poopy cors bs
    app.use(express.json())

app.post('/create-acc', (req, res) => {
    const data = req.body
    console.log('creating account')
    console.log(data)
    console.log(data.username)
    console.log(data.password)

    const dir = path.join('users', data.username)

    fs.mkdirSync(dir, {recursive: true})

    const userpath = path.join('users', data.username, 'userdata.json')

    const userdata = {
        username: data.username,
        password: data.password
    }

    fs.writeFileSync(userpath, JSON.stringify(userdata))
    res.type('text').send('ok')
})

app.post('/edit-acc', (req, res) => {
    const data = req.body
    console.log('editing account')
    console.log(data)
    console.log(data.username)
    console.log(data.password)

    const filePath = path.join('users', data.username, 'icon.png')

    const file = dataUriToFile(data.icon)

    fs.writeFileSync(filePath, file)
    res.type('text').send('ok')
})

app.get('/', (req, res) => {
    console.log('opening main page')

    const html = fs.readFileSync('index.html', 'utf-8')
    res.type('html').send(html)
})

app.post('/echo', (req, res) => {


    console.log(req.body.text)
    res.type('text').send(req.body.text)
})

app.listen(port, (e) => console.log(`catConnect is listening on ${port}.`))
