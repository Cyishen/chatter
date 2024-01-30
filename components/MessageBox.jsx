import { format } from "date-fns"

const MessageBox = ({ message, currentUser }) => {
  return message?.sender?._id !== currentUser._id ? (
    <div className="message-box">
      <img 
        src={message?.sender?.profileImage || "/assets/person.jpg"} 
        alt="profile photo" 
        className="message-profilePhoto" 
      />
      <div className="message-info">
        <p className="text-small-bold">
          {message?.sender?.username}
        </p>

        {message?.text ? (
          <div className="flex gap-3">
            <p className="message-text">{message?.text}</p>
            <p className="text-small-medium flex items-end">
              {format(new Date(message?.createdAt), "p")}
            </p>
          </div>
        ) : (
          <div className="flex gap-3">
            <img src={message?.photo} alt="message" className="message-photo" />
            <p className="text-small-medium flex items-end">
              {format(new Date(message?.createdAt), "p")}
            </p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="message-box justify-end">
      <div className="message-info items-end">
        {/* <p className="text-small-medium">
          {format(new Date(message?.createdAt), "p")}
        </p> */}

        {message?.text ? (
          <div className="flex gap-3">
            <p className="text-small-medium flex items-end">
              {format(new Date(message?.createdAt), "p")}
            </p>
            <p className="message-text-sender">{message?.text}</p>
          </div>
        ) : (
          <div className="flex gap-3">
            <p className="text-small-medium flex items-end">
              {format(new Date(message?.createdAt), "p")}
            </p>
            <img src={message?.photo} alt="message" className="message-photo" />
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageBox