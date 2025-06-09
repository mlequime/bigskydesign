import { getSite } from '@/sanity/lib/queries'
import Img from '@/ui/Img'
import Social from '@/ui/Social'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import { FaEnvelope, FaMapPin, FaPhone } from 'react-icons/fa6'
import Navigation from './Navigation'

export default async function Footer() {
	const { title, logo, copyright, description, phone, location, email } =
		await getSite()

	const logoImage = logo?.image?.light || logo?.image?.default

	return (
		<footer
			className="bg-primary flex flex-col gap-8 p-12 text-center text-canvas max-lg:p-10 max-md:p-6"
			role="contentinfo"
		>
			<div className="flex flex-wrap justify-between gap-x-12 gap-y-8 max-sm:flex-col">
				<div className="flex flex-col gap-3 self-start max-sm:mx-auto max-sm:items-center">
					<Link className="h3 md:h2 max-w-max" href="/">
						{logoImage ? (
							<Img
								className="max-h-[2.5em] w-auto"
								image={logoImage}
								alt={logo?.name || title}
							/>
						) : (
							title
						)}
					</Link>
				</div>
				<Social />
			</div>
			<div className="flex flex-wrap justify-between gap-x-12 gap-y-8 text-left max-sm:flex-col">
				<div className="min-w-sm flex max-w-lg flex-col gap-3 self-start max-sm:mx-auto max-sm:items-center">
					{description && <PortableText value={description} />}
				</div>
				{location && (
					<div className="items-top min-w-sm flex gap-3">
						<FaMapPin />
						<PortableText value={location} />
					</div>
				)}
				<div className="min-w-sm flex flex-col gap-3 self-start max-sm:mx-auto max-sm:items-center">
					{phone && (
						<div className="flex items-center gap-3">
							<FaPhone />
							<span className="font-bold">{phone}</span>
						</div>
					)}
					{email && (
						<div className="flex items-center gap-3">
							<FaEnvelope />
							<a href={`mailto:${email}`} className="font-bold">
								{email}
							</a>
						</div>
					)}
				</div>
				<Navigation />
			</div>

			{copyright && (
				<div className="mx-auto flex max-w-screen-xl flex-wrap justify-center gap-x-6 gap-y-2 border-t border-canvas/20 p-4 text-sm">
					<PortableText value={copyright} />
				</div>
			)}
		</footer>
	)
}
