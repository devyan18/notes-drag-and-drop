import { SetSession } from '../../providers/SessionProvider'
import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Auth () {
  const changeSession = SetSession()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleSetValues = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const fetchLogin = async (email, password) => {
    return fetch('https://dws-nest-notes-app-production.up.railway.app/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchLogin(form.email, form.password)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        changeSession(data.Authorization)
      })
  }

  return (
		<Container className='p-3' style={{ width: '50%' }} align="center">
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						name='email'
						value={form.email}
						onChange={handleSetValues}
					/>
					<Form.Text className="text-muted">
						Well never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						name='password'
						value={form.password}
						onChange={handleSetValues}
					/>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Form>
		</Container>
  )
}

export default Auth
