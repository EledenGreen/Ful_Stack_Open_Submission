const express =  require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('req-body', (req) => {
    return JSON.stringify(req.body)
})

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
}

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));
app.use(requestLogger)

let persons = [
    
        
            { 
              "id": 1,
              "name": "Arto Hellas", 
              "number": "040-123456"
            },
            { 
              "id": 2,
              "name": "Ada Lovelace", 
              "number": "39-44-5323523"
            },
            { 
              "id": 3,
              "name": "Dan Abramov", 
              "number": "12-43-234345"
            },
            { 
              "id": 4,
              "name": "Mary Poppendieck", 
              "number": "39-23-6423122"
            }
         
    
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const personSize = Object.keys(persons).length
    const date = new Date()
    const sendSizeDate = `<p>Phonebook has info for ${personSize} people</p> <br/> ${date}`
    response.send(sendSizeDate)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person)
    {   
        response.json(person)
    }
    else
    {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const randomId = Math.random()*1000000

    return randomId
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const nameFound = persons.find(person => person.name === body.name)

    if(!body.name || !body.number) 
    {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    if(nameFound)
    {
        return response.status(404).json({
            error: `name '${body.name}' already exist`
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),        
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(unknownEndpoint)