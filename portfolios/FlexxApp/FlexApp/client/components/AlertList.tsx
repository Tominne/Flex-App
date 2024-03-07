import { getThoughts } from '../apis/alert'
import React, { useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import { useQuery } from '@tanstack/react-query'
import AlertForm from './AlertForm'

export default function ThoughtList() {
  const {
    data: thoughts,
    isError,
    isLoading,
  } = useQuery(['thoughts'], getThoughts)
  useEffect(() => {
    return () => {}
  }, [])
  if (isError) {
    return (
      <div>
        There was an error loading any thoughts atm.
        <br></br>
        Please come back later
        <br></br>
        Cheers...
        <div>
          <br></br>
          <a href="/Malan.png">
            <img className="gif" src="/Malan.png" alt="David Malan"></img>
          </a>
          <p>This is David Malan!</p>
          <p>This is still me running in a field!</p>
        </div>
        <div className="background">
          <section className="alert-list">
            <br></br>
            <h2>Customize a semi coherent thought</h2>
            <AlertForm />
          </section>
        </div>
      </div>
    )
  }

  if (thoughts === 'null' || isLoading) {
    return (
      <div className="loading">
        Loading a semi coherent thought...
        <br></br>
        <div>
          <br></br>
          <a href="/Malan.png">
            <img className="gif" src="/Malan.png" alt="David Malan"></img>
          </a>
          <p>This is David Malan!</p>
        </div>
        <section className="alert-list">
          <br></br>
          <h2>Customize a semi coherent thought</h2>
          <AlertForm />
        </section>
      </div>
    )
  } else {
    return (
      <div>
        {thoughts.map((thought: any, index: any) => (
          <div key={index}>
            {thought.thoughtName ? thought.thoughtName : 'No thoughts here...'}
          </div>
        ))}

        <div>
          <br></br>
          <a href="/Malan.png">
            <img className="gif" src="/Malan.png" alt="David Malan"></img>
          </a>
          <p>This is David Malan!</p>
        </div>
        <div className="background">
          <section className="alert-list">
            <br></br>
            <h2>Customize a semi coherent thought</h2>
            <AlertForm />
          </section>
        </div>
      </div>
    )
  }
}
