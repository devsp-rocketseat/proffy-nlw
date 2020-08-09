import express from 'express'

const app = express()

app.use(express.json())

app.get('/users', (req, res) => {
    console.log('abriu a rota')
    res.json(["vitor", "thomas"])
})

app.listen(3333, () => console.log('Server rodando na porta: 3333'))
