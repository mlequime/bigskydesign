import {
	CalendarDate,
	fromDate,
	getLocalTimeZone,
	toCalendarDate,
	today,
} from '@internationalized/date'
import { DatePicker } from '@nextui-org/react'
import { FC } from 'react'
export const EventDatePicker: FC<{
	date: Date | null
	setDate: (date: CalendarDate | null) => void
}> = ({ date, setDate }) => {
	const dateValue = date
		? toCalendarDate(fromDate(date, getLocalTimeZone()))
		: null
	return (
		<DatePicker
			className="max-w-[260px] rounded-none [&>[data-slot='input-wrapper']]:rounded-none"
			classNames={{
				input: 'rounded-none',
				selectorButton: 'rounded-none',
				base: 'rounded-none',
				innerWrapper: 'rounded-none',
			}}
			label={
				<span>
					When? <span className="text-[0.625rem] font-bold">(Optional)</span>
				</span>
			}
			value={dateValue}
			onChange={(date) => setDate(date)}
			minValue={today(getLocalTimeZone()).add({ days: 1 })}
			visibleMonths={2}
		/>
	)
}
