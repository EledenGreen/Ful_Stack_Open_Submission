import { useContext } from "react"
import CounterContext from "../CounterContext"

const Notification = () => {
  const [counter] = useContext(CounterContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {counter}
    </div>
  )
}

export default Notification
