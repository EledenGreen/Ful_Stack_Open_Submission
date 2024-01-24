require('dotenv').config()
const express =  require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

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

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));
app.use(requestLogger)

/*let persons = [
    
        
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
*/

/*app.get('/', (request, response) => {
    response.json(persons)
})*/

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/info', (request, response) => {
    /*const personSize = Object.keys(persons).length*/
    const date = new Date()
    Person.find({}).then(person => 
        {const personSize = person.length
    const sendSizeDate = `<p>Phonebook has info for ${personSize} people</p> <br/> ${date}`
    response.send(sendSizeDate)
})
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person)
            {
                response.json(person)
            }
            else
            {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(person => {
        response.json(person)
    })
    .catch(error => next(error))
})

/*const generateId = () => {
    const randomId = Math.random()*1000000

    return randomId
}*/

app.post('/api/persons', (request, response, next) => {
    
    const body = request.body
    const nameFound = persons.find(person => person.name === body.name)
    
    if(body.content === undefined)
    {
        return response.status(400).json({ error: 'content missing' })
    }

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

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body

    Person.findByIdAndUpdate(request.params.id, {name, number}, {new: true, runValidators: true, context: 'query'})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError')
    {
        return response.status(400).send({ error: 'malformed id'})
    }
    next(error)
}
app.use(errorHandler)