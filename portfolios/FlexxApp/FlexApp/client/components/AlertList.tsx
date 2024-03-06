import { getAlerts } from '../apis/alert'
import React, { useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import { useQuery } from '@tanstack/react-query'
import AlertForm from './AlertForm'

export default function AlertList() {
  const { data: alerts, isError, isLoading } = useQuery(['alerts'], getAlerts)
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
          <a href="/minstand.jpg">
            <img className="gif" src="/minstand.jpg" alt="Min Running"></img>
          </a>
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

  if (alerts === 'null' || isLoading) {
    return (
      <div className="loading">
        Loading a semi coherent thought...
        <br></br>
        <div>
          <br></br>
          <a href="/minstand.jpg">
            <img className="gif" src="/minstand.jpg" alt="Min Running"></img>
          </a>
          <p>This is me running in a field!</p>
        </div>
        <section className="alert-list">
          <br></br>
          <h2>Customize a semi coherent thought</h2>
          <AlertForm />
        </section>
      </div>
    )
  }
}
