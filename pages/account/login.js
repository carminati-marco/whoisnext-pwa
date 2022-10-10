import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Input, Spacer, Grid, Text } from '@nextui-org/react'
import useAuth from '../../hooks/useAuth'
import Page from '@/components/page'
import Section from '@/components/section'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const { setUser } = useAuth()

	const router = useRouter()
	const handleSubmit = async (e) => {
		e.preventDefault()
		// call the API route

		const res = await fetch('http://127.0.0.1:5000/api/tokens', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
		if (res.ok) {
			const user = await res.json()
			setUser(user)
			router.push('/')
		} else {
			const errData = await res.json()
			setError(errData)
		}
	}

	return (
		<Page>
			<Section>
				<Grid.Container gap={1}>
					<Grid>
						<Text
							h1
							size={20}
							css={{
								textGradient: '45deg, $blue600 -20%, $pink600 50%',
							}}
							weight='bold'
						>
							Login
						</Text>
						{error && (
							<div className='border-2 p-5 font-bold text-red-700'>
								{error.description}
							</div>
						)}
						<form
							className=' flex max-w-md flex-col items-center justify-center'
							onSubmit={handleSubmit}
						>
							<Spacer y={1.5} />

							<Input
								width="100%"
								animated={false}
								labelPlaceholder='Email'
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
							<Spacer y={1.5} />
							<Input.Password
								animated={false}
								labelPlaceholder='Password'
								initialValue='nextui123'
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>

							<Button bordered color='primary' auto>
								Login
							</Button>
						</form>
					</Grid>
				</Grid.Container>
			</Section>
		</Page>
	)
}

export default Login
