import request from 'superagent'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Alert, AlertData } from '../../models/alert'
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const thoughtURL = 'http://localhost:3000/api/thoughts'

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

//get alert
export async function getAlerts(): Promise<any> {
  try {
    const response = await request.get(`${thoughtURL}/`)
    console.log(response.body)
    const stringed = JSON.stringify(response.body)
    const cleanedString = stringed.replace(/[{}:"]/g, ' ')
    return cleanedString
  } catch (error) {
    console.error(error)
  }
}

// GET /api/v1/alert/:alertId
export async function getalertById(alertId: string): Promise<Alert> {
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

interface Deletealert {
  alertId: Alert['id']
}
// DELETE /api/v1/alert/:alertId
export async function deletealert({ alertId }: Deletealert): Promise<void> {
  await request.delete(`${thoughtURL}/${alertId}`)
}

interface Updatealert {
  alertId: Alert['id']
  newalertName: Alert['AlertName']
}

export async function updatealert({
  alertId,
  newalertName,
}: Updatealert): Promise<void> {
  await request
    .patch(`${thoughtURL}/${alertId}`)
    .send({ alertName: newalertName })
}
