import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addThought } from '../apis/alert'
import { Button, Dropdown } from 'react-bootstrap'

const initialFormData = {
  thoughtName: '',
}

export default function AlertForm() {
  const [form, setForm] = useState(initialFormData)
  const [isOpen, setIsOpen] = useState(false)

  const queryClient = useQueryClient()

  const addThoughtMutation = useMutation(addThought, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['thoughts'])
    },
  })

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault()
    addThoughtMutation.mutate(form)
    setForm(initialFormData)
  }

  if (addThoughtMutation.isError) {
    return <div>There was an error trying to add your wise thought</div>
  }

  if (addThoughtMutation.isLoading) {
    return <div>Adding your thought I guess...</div>
  }

  return (
    <>
      <section id="add-alert-to-list" className="formContainer">
        <input
          type="text"
          value={form.thoughtName}
          onChange={(e) => setForm({ thoughtName: e.target.value })}
          placeholder="Enter new thought text"
        />
        <br></br>
        <Button onClick={handleSubmit}>Add Thought</Button>
        <br></br>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Examples
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Existential anxiety</Dropdown.Item>
            <Dropdown.Item>Yay breaking the law!</Dropdown.Item>
            <Dropdown.Item>I like Cats</Dropdown.Item>
            <Dropdown.Item>Can I go home?</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </section>
    </>
  )
}
