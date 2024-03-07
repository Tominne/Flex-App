import request from 'superagent'

const imgURL = 'http://localhost:3000/api/imgs'

export async function saveImg(pfp: string): Promise<string> {
  try {
    const response = await request.post(`${imgURL}`).send({ pfp })
    console.log(response.body)
    return response.body
  } catch (error) {
    console.error(error)
    throw error
  }
}
