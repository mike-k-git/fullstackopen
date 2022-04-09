const Notification = ({ message }) => {
  if (!message) return null

  const { text, type } = message

  return <div className={`notification ${type}`}>{text}</div>
}

export default Notification
