import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdotes } from "../requests"
import { useContext } from "react"
import CounterContext from "../CounterContext"

const AnecdoteForm = () => {
  const [counter, dispatch] = useContext(CounterContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({ type: 'NEW', payload: `new anecdote ${newAnecdote.content}` })
      setTimeout(() => {
        dispatch('')
      }, 5000);
    },
    onError: (response) => {
      if (response.response.status === 400) {
        dispatch({ type: 'NEW', payload: `too short anecdote, must have length 5 or more` })
        setTimeout(() => {
          dispatch('')
        }, 5000)
      }
      else {
        dispatch({ type: 'NEW', payload: `${response.message}` })
        setTimeout(() => {
          dispatch('')
        }, 5000);
      }
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
