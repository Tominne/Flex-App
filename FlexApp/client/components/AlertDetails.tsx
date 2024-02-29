import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { getalertById } from '../apis/alert'

export default function AlertDetails() {
  const { alertId } = useParams()

  const alertDetailsQuery = useQuery(['alerts', alertId], () =>
    getalertById(alertId as string)
  )

  if (alertDetailsQuery.isError) {
    return (
      <div>
        There was an error loading any thoughts today try again tomorrow cheers
      </div>
    )
  }

  if (alertDetailsQuery.isLoading) {
    return <div>STOP VISITING MY MUMS HOUSE WITHOUT ME</div>
  }

  return (
    <section className="alert-details">
      <h2>Cat I please pet your cat</h2>
      <p>{`${alert}`}</p>
    </section>
  )
}
