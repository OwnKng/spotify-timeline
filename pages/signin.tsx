import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

const SignIn = () => {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.push('/dashboard')
  }, [session, router])

  return (
    <div>
      <button onClick={() => signIn('spotify')}>Sign in</button>
    </div>
  )
}

export default SignIn
