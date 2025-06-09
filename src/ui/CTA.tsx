import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'
import { FaAngleRight } from 'react-icons/fa6'

export default function CTA({
	_type,
	_key,
	link,
	style,
	className,
	children,
	arrow,
	...rest
}: Sanity.CTA & ComponentProps<'a'>) {
	const props = {
		className: cn(stegaClean(style), className) || undefined,
		children: (
			<>
				{arrow ? <FaAngleRight className="mr-2 inline-block" /> : null}
				{children ||
					stegaClean(link?.label) ||
					stegaClean(link?.internal?.title) ||
					link?.external}
			</>
		),
		...rest,
	}

	if (link?.type === 'internal' && link.internal)
		return (
			<Link
				href={processUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				{...props}
			/>
		)

	if (link?.type === 'external' && link.external)
		return <a href={stegaClean(link.external)} {...props} />

	return <div {...(props as ComponentProps<'div'>)} />
}
