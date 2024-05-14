import { addAnecdoteAction } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { notificationAction, notificationRemover } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const response = await anecdoteService.create(content)
        console.log(response)
        dispatch(addAnecdoteAction(content))
        dispatch(notificationAction(content))
        setTimeout(() => {
            dispatch(notificationRemover())
        }, 5000);
    }   
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name='anecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>

    )
}

export default AnecdoteForm