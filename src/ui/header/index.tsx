import { cn } from '@/lib/utils'
import { getSite } from '@/sanity/lib/queries'
import Img from '@/ui/Img'
import Link from 'next/link'
import { BookingButton } from './BookingButton'
import css from './Header.module.css'
import Navigation from './Navigation'
import Toggle from './Toggle'
import Wrapper from './Wrapper'

export default async function Header() {
	const { title, logo, ctas } = await getSite()

	const logoImage = logo?.image?.dark || logo?.image?.default

	return (
		<Wrapper className="frosted-glass sticky top-0 z-10 bg-canvas shadow-md max-lg:header-open:shadow-2xl">
			<div className={cn(css.header, 'mx-auto grid items-center gap-x-6')}>
				<div className="[grid-area:logo]">
					<Link
						className={cn(
							'h5 md:h4 inline-block',
							logo?.image && 'max-w-[50vw]',
						)}
						href="/"
					>
						{logoImage ? (
							<Img
								className="user-select-none inline-block max-h-[3em] w-auto"
								image={logoImage}
								alt={logo?.name || title}
							/>
						) : (
							<span className="text-gradient">{title}</span>
						)}
					</Link>
				</div>

				<Navigation />

				<div className="ml-auto flex h-full items-center gap-x-6 max-lg:header-closed:hidden max-md:mx-auto lg:ml-auto">
					<div className="max-xl:font-sm flex font-bold text-gray-500 max-lg:hidden">
						<a href="tel:+441617615980">0161 761 5980</a>
					</div>
					<BookingButton />
				</div>
				<Toggle />
			</div>
		</Wrapper>
	)
}
