import { useDispatch, useSelector } from "react-redux"
import { voteAction } from "../reducers/anecdoteReducer"
import { notificationRemover, notificationVote } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const {anecdotes} = useSelector((state) => state)

    const anecdote = useSelector(({ filter, anecdotes }) => {
        

        const newAnecdote = anecdotes.slice().filter(e => e.content.toLowerCase().includes(filter.toLowerCase()))

        return newAnecdote.sort((a, b) => b.votes - a.votes)
    })
    

    const vote = (id) => {
        console.log('vote', id)
        const anecdoteVote = anecdotes.find(n => n.id === id)
        dispatch(voteAction(id, anecdoteVote))
        dispatch(notificationVote(anecdoteVote.content))
        setTimeout(() => {
            dispatch(notificationRemover())
        }, 5000);
    }


    return (
        <div>
            {anecdote.map(anecdote =>
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