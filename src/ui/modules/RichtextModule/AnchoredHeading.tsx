import { slug } from '@/lib/utils'
import { VscLink } from 'react-icons/vsc'
import type { PortableTextBlock, PortableTextComponentProps } from 'next-sanity'

export default function AnchoredHeading({
	as: Tag,
	children,
	value,
}: {
	as: React.ElementType
} & PortableTextComponentProps<PortableTextBlock>) {
	const id = slug(value.children.reduce((acc, { text }) => acc + text, ''))

	return (
		<Tag id={id} className="w-fit-content group relative m-auto">
			{children}

			{/* <a
				className="anim-fade-to-r absolute -right-5 top-1/2 ml-2 -translate-y-1/2 transform !no-underline group-target:inline-block md:hidden md:group-hover:block"
				href={`#${id}`}
			>
				<VscLink className="inline-block align-baseline text-[smaller]" />
			</a> */}
		</Tag>
	)
}
