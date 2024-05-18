import { useSelector } from 'react-redux'

const Notification = () => {
  const isVisible = useSelector(({ notification }) => {
    return notification
  })

  const content = useSelector(({ notification }) => {
    return notification
  })

  let notificationstyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: isVisible ? 'block' : 'none',
  }

  return <div style={notificationstyle}>{content}</div>
}

export default Notification
