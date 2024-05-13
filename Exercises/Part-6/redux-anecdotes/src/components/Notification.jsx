import { useSelector } from "react-redux"

const Notification = () => {
  const content = useSelector(({ notification }) => {
    if ( notification === 'works')
        return notification
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      render here notification...{content}
    </div>
  )
}

export default Notification