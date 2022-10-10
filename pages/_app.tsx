import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import Meta from '@/components/meta'
import '@/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<NextUIProvider>
			<Meta />
			<Component {...pageProps} />
		</NextUIProvider>
	)
}

export default App
