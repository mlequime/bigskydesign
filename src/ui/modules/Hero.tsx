import Img, { Source, Overlay } from '@/ui/Img'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import Pretitle from '@/ui/Pretitle'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import { cn } from '@/lib/utils'
import { TextInput } from 'sanity'
import EventBookingRow from './booking/EventBookingRow'

export default function Hero({
	pretitle,
	content,
	ctas,
	bgImage,
	bgImageMobile,
	showContact,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	bgImage: Sanity.Image
	bgImageMobile: Sanity.Image
	showContact: boolean
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const hasImage = !!bgImage?.asset

	return (
		<section
			className={cn(
				hasImage &&
					'grid overflow-hidden bg-ink text-canvas *:col-span-full *:row-span-full',
			)}
		>
			{hasImage && (
				<picture className="relative h-[32rem] w-full">
					<Source image={bgImageMobile} imageWidth={1200} />
					<Overlay />
					<Img
						className="size-full max-h-[none] object-cover"
						image={bgImage}
						imageWidth={1800}
						draggable={false}
					/>
				</picture>
			)}

			{content && (
				<div
					className={cn(
						'section flex w-full flex-col',
						hasImage && 'justify-end',
					)}
				>
					<div
						className={cn(
							'richtext max-w-xxl relative isolate flex flex-col gap-4 [&_:is(h1,h2)]:text-balance',
							hasImage && 'text-shadow',
							{
								'mb-8': stegaClean(alignItems) === 'start',
								'my-auto': stegaClean(alignItems) === 'center',
								'mt-auto': stegaClean(alignItems) === 'end',
							},
							{
								'mr-auto': stegaClean(textAlign) === 'left',
								'mx-auto': stegaClean(textAlign) === 'center',
								'ml-auto': stegaClean(textAlign) === 'right',
							},
						)}
						style={{
							textAlign: stegaClean(textAlign),
							textShadow: hasImage
								? '0 2px 12px rgba(54, 44, 46, 0.4), 0 4px 4px rgba(0,0,0,0.35)'
								: '',
						}}
					>
						<Pretitle className={cn(hasImage && 'text-slate-100', 'text-xl')}>
							{pretitle}
						</Pretitle>

						<PortableText
							value={content}
							components={{
								types: {
									'custom-html': ({ value }) => <CustomHTML {...value} />,
									'reputation-block': ({ value }) => (
										<Reputation
											className={cn(
												'!mt-4',
												hasImage && '[&_strong]:text-amber-400',
												{
													'justify-start': stegaClean(textAlign) === 'left',
													'justify-center': stegaClean(textAlign) === 'center',
													'justify-end': stegaClean(textAlign) === 'right',
												},
											)}
											reputation={value.reputation}
										/>
									),
								},
							}}
						/>

						{showContact && <EventBookingRow />}

						<CTAList
							ctas={ctas}
							className={cn('!mt-4', {
								'justify-start': stegaClean(textAlign) === 'left',
								'justify-center': stegaClean(textAlign) === 'center',
								'justify-end': stegaClean(textAlign) === 'right',
							})}
						/>
					</div>
				</div>
			)}
		</section>
	)
}
