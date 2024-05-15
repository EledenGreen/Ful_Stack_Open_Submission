import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useReducer } from 'react'
import CounterContext from './CounterContext'

const counterReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW':
      return action.payload
    default:
      return null
  }
}

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, null)
  console.log(counter)

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], oldData => {
        if(!oldData) return []
        return oldData.map(anecdote => 
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      })
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    counterDispatch({ type: 'NEW', payload: `You voted ${anecdote.content}`})
    setTimeout(() => {
      counterDispatch('')
    }, 5000);
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isPending) {
    return <div>pending</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  console.log(anecdotes)
  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
      <Notification />

      <h3>Anecdote app</h3>

      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </CounterContext.Provider>
  )
}

export default App
