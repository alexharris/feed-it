'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signup } from './actions'

export default function SignupPage() {

  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const result = await signup(formData)

    if (result.error) {
      setError(result.error)
    } else {
      // Handle successful login, e.g., redirect to dashboard
    }
  }  

  return (
    <div className="max-w-sm mx-auto">
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      {error && <div className="bg-red-100 p-4 rounded error">{error}</div>}
      <button className="button i" formAction={signup}>Sign up</button>
      <p>
        Already have an account? <Link href="/login">Sign in.</Link>
      </p>
    </form>
    </div>
  )
}