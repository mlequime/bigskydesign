// import { GoogleTagManager } from '@next/third-parties/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SkipToContent from '@/ui/SkipToContent'
import Announcement from '@/ui/Announcement'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import VisualEditingControls from '@/ui/VisualEditingControls'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/app.css'
import { Charis_SIL, Martel_Sans } from 'next/font/google'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'

const CharisSIL = Charis_SIL({
	subsets: ['latin'],
	weight: '400',
	style: 'italic',
	variable: '--font-charis-sil',
})
const MartelSans = Martel_Sans({
	subsets: ['latin'],
	weight: ['400', '600'],
	style: ['normal'],
	variable: '--font-martel-sans',
})

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			{/* <GoogleTagManager gtmId='' /> */}

			<body
				className={`bg-canvas text-ink ${CharisSIL.variable} ${MartelSans.variable} default`}
			>
				<NextUIProvider locale={'en-GB'}>
					<NuqsAdapter>
						<SkipToContent />
						<Announcement />
						<Header />
						<main id="main-content" role="main" tabIndex={-1}>
							{children}
						</main>
						<Footer />

						<VisualEditingControls />
					</NuqsAdapter>

					<Analytics />
					<SpeedInsights />
					<Toaster />
				</NextUIProvider>
			</body>
		</html>
	)
}
