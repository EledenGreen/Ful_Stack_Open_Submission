import { useContext } from 'react'
import CounterContext from '../CounterContext'

const Notification = () => {
  const [counter] = useContext(CounterContext)
  const isVisible = counter

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: isVisible ? 'block' : 'none',
  }

  return <div style={style}>{counter}</div>
}

export default Notification
