const Notification = ({ message }) => {
    return message[0] === null
        ? null
        : (
            <div className = {message[1]}>
                {message[0]}
            </div>
        )
}

export default Notification