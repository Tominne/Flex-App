import request from 'superagent'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const thoughtURL = 'https://localhost:3fire002/api/thoughts'

export const signUp = async (email: string, password: string) => {
  try {
    const response = await request
      .post(`${thoughtURL}/signup?email=${email}&password=${password}`) // use & to separate parameters
      .type('form')
      .send({ email, password })

    if (response.status == 200) {
      toast.success(`Welcome to the PING CULT ${email}`, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  } catch (err) {
    console.log(err)
    // Display an error toast message
    if (err instanceof Error)
      toast.error(err.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    return { success: false, message: 'Nope going on the signinbg in sadge' }
  }
}

export const login = async (username: string, password: string) => {
  try {
    const response = await request
      .post(`${thoughtURL}/login`)
      .type('form')
      .send({ username, password })

    if (response.status == 200) {
      toast.success(`You're all logged in ${username}`, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  } catch (err) {
    console.log(err)
    // Display an error toast message
    if (err instanceof Error)
      toast.error(err.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    return { success: false, message: 'Nope going on the logging in sadge' }
  }
}

//get thoughts
export async function getThoughts(): Promise<any> {
  try {
    const response = await request.get(`${thoughtURL}`)
    console.log(response.body)
    return response.body
  } catch (error) {
    console.error(error)
  }
}

// GET /api/v1/alert/:alertId
export async function getalertById(alertId: string): Promise<string> {
  const response = await request.get(`${thoughtURL}/${alertId}`)
  return response.body
}

// POST /api/thoughts
export async function addThought(thoughtName: string): Promise<string> {
  console.log(thoughtName)
  const response = await request.post(thoughtURL).send({ thoughtName })
  console.log(response.body)
  return response.body
}
