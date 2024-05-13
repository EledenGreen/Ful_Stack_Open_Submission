import { useDispatch, useSelector } from "react-redux"
import { voteAction } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        

        const newAnecdote = anecdotes.slice().filter(e => e.content.toLowerCase().includes(filter.toLowerCase()))

        return newAnecdote.sort((a, b) => b.votes - a.votes)
    })

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAction(id))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export { AnecdoteList }