import { useSelector } from "react-redux"

const Notification = () => {
  const isVisible = useSelector(({notification}) => {return notification})

  const content = useSelector(({ notification }) => {
    if ( notification === 'works')
        return notification
    return notification
  })


  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: isVisible ? 'block' : 'none'
    }

  return (
    <div style={style}>
      {content}
    </div>
  )
}

export default Notification