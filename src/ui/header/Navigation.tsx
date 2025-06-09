import { getSite } from '@/sanity/lib/queries'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'

export default async function Menu() {
	const { headerMenu } = await getSite()

	return (
		<nav
			className="max-lg:anim-fade-to-r flex gap-y-2 [grid-area:nav] max-lg:my-4 max-lg:flex-col max-lg:header-closed:hidden md:justify-center"
			role="navigation"
		>
			{headerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return (
							<CTA
								className="hover:link uppercase tracking-wider text-primary lg:px-3"
								link={item}
								key={key}
							/>
						)

					case 'link.list':
						return <LinkList {...item} key={key} />

					default:
						return null
				}
			})}
		</nav>
	)
}
