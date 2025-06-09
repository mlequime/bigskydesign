import { Select, SelectItem } from '@nextui-org/select'
import { eventTypes } from '@/ui/modules/booking/types'
import { FC } from 'react'
export const EventTypePicker: FC<{
	eventType: string
	setEventType: (type: string) => void
}> = ({ eventType, setEventType }) => {
	return (
		<Select
			id="event-type"
			label="What are you planning?"
			placeholder="Select event type"
			selectedKeys={eventType ? [eventType] : []}
			className="max-w-[260px] rounded-none"
			classNames={{ trigger: 'rounded-none' }}
			onSelectionChange={(keys) => setEventType(Array.from(keys)[0] as string)}
		>
			{eventTypes.map((type) => (
				<SelectItem key={type.value} value={type.value}>
					{type.label}
				</SelectItem>
			))}
		</Select>
	)
}
