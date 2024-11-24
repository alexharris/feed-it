'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signup(formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    email_confirmed: true
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  } else {
    revalidatePath('/', 'layout')
    redirect('/dashboard')
  }
}