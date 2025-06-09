import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'
import { Card } from './Card'

export default function CardList({
	pretitle,
	intro,
	cards,
	visualSeparation,
	...props
}: Partial<{
	pretitle: string
	intro: any
	cards: Partial<{
		title: string
		image: any
		content: any
		ctas: Sanity.CTA[]
	}>[]
	visualSeparation: boolean
}> &
	Sanity.Module) {
	return (
		<section className="section space-y-12" {...moduleProps(props)}>
			{(pretitle || intro) && (
				<header className="richtext text-center">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<div
				className={
					'grid items-stretch gap-12 *:h-full max-lg:gap-8 max-md:pb-4 md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]'
				}
			>
				{cards?.map((card, key) => <Card key={key} {...card} />)}
			</div>
		</section>
	)
}
