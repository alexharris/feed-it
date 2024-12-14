'use client'

import Link from 'next/link'
import { useState } from 'react'
import { login } from './actions'

export default function LoginPage() {

  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const result = await login(formData)

    if (result.error) {
      setError(result.error)
    } else {
      // Handle successful login, e.g., redirect to dashboard
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-12">
      <h1 className="mb-4">Login</h1>
      <form className="flex flex-col gap-2 border border-gray-200 rounded-2xl p-6 my-12" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input className="rounded-xl border-gray-200" id="email" name="email" type="email" required />
        <label className="mt-2" htmlFor="password">Password</label>
        <input className="rounded-xl border-gray-200 mb-6" id="password" name="password" type="password" required />
        {error && <div className="bg-red-100 p-4 rounded error">{error}</div>}
        <button className="button" formAction={login}>Log in</button>
      </form>
      <p>
        No account? <Link href="/signup">Sign up.</Link>
      </p>      
    </div>
  )
}