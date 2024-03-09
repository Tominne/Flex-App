import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import React, { useEffect, useState } from 'react'
import { MDBNavbarLink } from 'mdb-react-ui-kit'
import { ToastContainer, toast } from 'react-toastify'
import {
  signUp,
  signIn,
  deleteCurrentUser,
  emailVerify,
} from '../apis/fetchUser'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const [timeOfDay, setTimeOfDay] = useState('waiting')
  const [greeting, setGreeting] = useState('Hello!')
  const [buttonColor, setButtonColor] = useState('primary')

  const [isSignedUp, setIsSignedUp] = useState(false)

  useEffect(() => {
    const now = new Date()
    const hours = now.getHours()

    let greeting
    if (hours < 12) {
      setGreeting('Good Morning! 🐔')
      setTimeOfDay('dawn')
      setButtonColor('success')
    } else if (hours < 18) {
      setGreeting('Good Afternoon 🐈')
      setTimeOfDay('waiting')
      setButtonColor('warning')
    } else if (hours >= 18 && hours < 24) {
      setGreeting('Good Evening 🥰')
      setTimeOfDay('dusk')
      setButtonColor('danger')
    } else {
      setTimeOfDay('waiting')
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await signUp(email, password)
      setEmail('')
      setPassword('')
      setIsSignedUp(true)
      setMessage('You are all signed in')
    } catch (err) {
      console.log(err)
      setMessage('soz loser')
    }
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await signIn(email, password)
      setEmail('')
      setPassword('')
      setIsSignedUp(true)
    } catch (err) {
      console.log(err)
    }
  }

  function toggleForm() {
    setIsSignedUp((prevState) => !prevState)
  }

  return (
    <div className={`${timeOfDay}`}>
      <h1>{`${greeting}`}</h1>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="button-container">
        <MDBNavbarLink href="/">
          <Button variant={buttonColor} size="lg" className="round-button">
            Existential Well
          </Button>
        </MDBNavbarLink>
        <MDBNavbarLink href="/profile">
          <Button variant={buttonColor} size="lg" className="round-button">
            Your Broken Profile
          </Button>
        </MDBNavbarLink>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <Alert className="alert">Welcome to MY WEIRD WEB SPACE</Alert>
      {/* Use a ternary operator to render either the sign up form or the log in form */}
      {isSignedUp ? (
        // Render the sign up form
        <>
          <form onSubmit={handleLogin}>
            <label htmlFor="email"> Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <br></br>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <br></br>
            <input type="submit" value="Log In"></input>
          </form>
          {/* Render a button to toggle to the log in form */}
          <Button onClick={toggleForm}>Sign up</Button>
        </>
      ) : (
        // Render the log in form
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email"> Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <br></br>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <br></br>
            <input type="submit" value="Sign Up"></input>
          </form>
          {/* Render a button to toggle to the sign up form */}
          <Button onClick={toggleForm}>
            Login(it doesnt rly work yet soz)
          </Button>
        </>
      )}
      {/* Render the toast container */}
      <ToastContainer />
    </div>
  )
}
