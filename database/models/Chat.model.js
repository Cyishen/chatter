import { Schema, model, models } from "mongoose"

const ChatSchema = new Schema({
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    default: []
  },
  messages: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Message'}],
    default: []
  },
  isGroup: { type: Boolean, default: false },
  name: { type: String, default: '' },
  groupPhoto: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  lastMessageAt: { type: Date, default: Date.now }
})

const Chat = models.Chat || model('Chat', ChatSchema)

export default Chat