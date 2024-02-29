import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addalert } from '../apis/alert'
import { Button, Dropdown } from 'react-bootstrap'

const initialFormData = {
  AlertName: '',
}

export default function AlertForm() {
  const [form, setForm] = useState(initialFormData)
  const [isOpen, setIsOpen] = useState(false)

  const queryClient = useQueryClient()

  const addalertMutation = useMutation(addalert, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['alerts'])
    },
  })

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault()
    addalertMutation.mutate(form)
    setForm(initialFormData)
  }

  if (addalertMutation.isError) {
    return <div>There was an error trying to add your alert</div>
  }

  if (addalertMutation.isLoading) {
    return <div>Adding your alert</div>
  }

  return (
    <>
      <section id="add-alert-to-list" className="formContainer">
        <input
          type="text"
          value={form.AlertName}
          onChange={(e) => setForm({ AlertName: e.target.value })}
          placeholder="Enter new alert text"
        />
        <br></br>
        <Button onClick={handleSubmit}>Add Alert</Button>
        <br></br>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Examples
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Mild Discomfort</Dropdown.Item>
            <Dropdown.Item>Require Urgent Action</Dropdown.Item>
            <Dropdown.Item>Keep Tabs</Dropdown.Item>
            <Dropdown.Item>On The Mend</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </section>
    </>
  )
}
