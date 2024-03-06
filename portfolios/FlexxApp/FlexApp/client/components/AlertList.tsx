import { getAlerts } from '../apis/alert'
import React, { useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import { useQuery } from '@tanstack/react-query'
import AlertForm from './AlertForm'
import { Uploader } from 'uploader'
import AlertListItem from './AlertListItem'
const uploader = Uploader({
  apiKey: 'free',
})

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
      </div>
    )
  }

  if (alerts === 'null' || isLoading) {
    return <div className="loading">Loading a semi coherent thought...</div>
  }

  if (!alerts || isLoading) {
    return <div>Loading a semi coherent thought...</div>
  }

  return (
    <div className="background">
      <section className="alert-list">
        <h2>Semi coherent thought list:</h2>
        <br></br>
        <Alert variant="danger">{`${[alerts]}`}</Alert>
        <br></br>
        <h2>Customize a semi coherent thought</h2>
        <AlertForm />
      </section>
    </div>
  )
}
