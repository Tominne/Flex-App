import request from 'superagent'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Alert, AlertData } from '../../models/alert'
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const alertURL = 'https://red-ping-api.isaacirvine.me'

export const signUp = async (email: string, password: string) => {
  try {
    const response = await request
      .post(`${alertURL}/signup?email=${email}&password=${password}`) // use & to separate parameters
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
      .post(`${alertURL}/login`)
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
    return { success: false, message: 'Nope going on the loggin in sadge' }
  }
}

//get alert
export async function getAlerts(): Promise<any> {
  try {
    const response = await request.get(`${alertURL}/`)
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
  const response = await request.get(`${alertURL}/${alertId}`)
  return response.body
}

// POST /api/v1/alert
export async function addalert(newalert: AlertData): Promise<Alert> {
  const response = await request.post(alertURL).send({ newalert })
  console.log(response.body)
  return response.body
}
interface Deletealert {
  alertId: Alert['id']
}
// DELETE /api/v1/alert/:alertId
export async function deletealert({ alertId }: Deletealert): Promise<void> {
  await request.delete(`${alertURL}/${alertId}`)
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
    .patch(`${alertURL}/${alertId}`)
    .send({ alertName: newalertName })
}
