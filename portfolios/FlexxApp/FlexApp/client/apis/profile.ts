import request from 'superagent'

const imgURL = 'http://localhost:3000/api/pfp'

export async function saveImg(pfp: string, userId: string): Promise<string> {
  try {
    const response = await request.post(`${imgURL}`).send({ pfp, userId }) // include userId in the request body
    console.log(response.body)
    return response.body
  } catch (error) {
    console.error(error)
    throw error
  }
}
