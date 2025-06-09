import { FC } from 'react'
import { PortableText } from 'next-sanity'
import Img, { Overlay } from '@/ui/Img'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'

type Props = {
	image?: any
	title?: string
	content?: any
	ctas?: Sanity.CTA[]
}

export const Card: FC<Props> = ({ image, title, content, ctas }) => {
	return (
		<article
			className={cn(
				'card relative mb-4 flex h-full flex-col gap-2',
				image ? 'min-h-[8rem]' : 'bg-background',
			)}
		>
			{image && (
				<figure className="flex min-h-[100%]">
					<Overlay />
					<Img
						className="h-100 aspect-video min-h-[100%] w-full object-cover"
						image={image}
						imageWidth={600}
					/>
				</figure>
			)}

			<div className="p-6 max-lg:p-4">
				{title && (
					<h2
						className={cn(
							'text-3xl text-primary',
							image &&
								'absolute left-0 right-0 top-6 text-center text-white max-lg:top-4',
						)}
						style={
							image && {
								textShadow:
									'0 2px 12px rgba(54, 44, 46, 0.4), 0 4px 4px rgba(0,0,0,0.35)',
							}
						}
					>
						{title}
					</h2>
				)}
				{image ? (
					<CardContent>
						<div className="richtext grow p-4 tracking-wide">
							<PortableText value={content} />
						</div>
						<CTAList className="card-action mt-auto" ctas={ctas} />
					</CardContent>
				) : (
					<div className="px-4 pt-4">
						<div className="standard-content richtext grow tracking-wide">
							<PortableText value={content} />
						</div>
						<CTAList className="card-action mt-auto" ctas={ctas} />
					</div>
				)}
			</div>
		</article>
	)
}

const CardContent = ({ children }: { children: React.ReactNode }) => (
	<div className="card-content absolute -bottom-4 border-4 border-white bg-primary p-2 text-sm text-white">
		{children}
	</div>
)
