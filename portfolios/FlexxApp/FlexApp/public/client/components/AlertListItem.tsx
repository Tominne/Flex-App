import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Stack } from 'react-bootstrap'
//import { deleteThought, updateThought } from '../apis/alert'

interface Props {
  alertId: number
  alertName: string
}

export default function AlertListItem({ alertId, alertName }: Props) {
  const [updating, setUpdating] = useState(false)
  const [rename, setRename] = useState(alertName)

  const queryClient = useQueryClient()

  /*const deletealertMutation = useMutation(deletealert, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['alerts'])
    },
  })*/

  /*const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    deletealertMutation.mutate({ thoughtId })
    console.log('deleting', thoughtId)
  }

  const updatealertMutation = useMutation(updateThought, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['alerts'])
    },
  })*/

  const handleUpdateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    /*updatealertMutation.mutate({
      alertId,
      newthought: rename,
    })

    console.log('submitting', rename)

    setUpdating(false)*/
  }

  const handleStopUpdatingClick = () => {
    setUpdating(false)
    setRename(alertName)
  }

  const handleStartUpdatingClick = () => {
    setUpdating(true)
  }

  return (
    <>
      <div>
        {updating ? (
          <form onSubmit={handleUpdateSubmit} aria-label="Update alert Form">
            <label htmlFor="updateName">Rename: </label>
            <input
              type="text"
              name="thoughtName"
              id="updateName"
              value={rename}
              onChange={(e) => setRename(e.target.value)}
            />

            <Button as="a" variant="primary" type="submit">
              Save
            </Button>
            <Button
              as="a"
              variant="primary"
              type="button"
              onClick={handleStopUpdatingClick}
            >
              Stop
            </Button>
          </form>
        ) : (
          <Stack direction="horizontal" gap={2}>
            <Button as="a" variant="primary" onClick={handleStartUpdatingClick}>
              Update
            </Button>
          </Stack>
        )}
      </div>
    </>
  )
}
