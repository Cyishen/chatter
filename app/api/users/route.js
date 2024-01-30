import User from "@database/models/User.model"
import { connectToDB } from "@database/mongodb"


export const GET = async (req, res) => {
  try {
    await connectToDB()

    const allUsers = await User.find()

    return new Response(JSON.stringify(allUsers), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to get all users", { status: 500 })
  }
}