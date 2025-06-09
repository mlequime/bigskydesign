'use client'

import { getLocalTimeZone } from '@internationalized/date'
import { Button } from '@nextui-org/button'
import React from 'react'
import { BookingFormModal } from './BookingFormModal'
import { EventDatePicker } from './controls/EventDatePicker'
import { EventTypePicker } from './controls/EventTypePicker'

export default function EventBookingRow() {
	const [date, setDate] = React.useState<Date | null>(null)
	const [eventType, setEventType] = React.useState<string>('')
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<div
			className="flex flex-col space-y-2 text-left shadow max-sm:items-center sm:flex-row sm:space-x-4 sm:space-y-0"
			style={{ textShadow: 'none' }}
		>
			<EventTypePicker eventType={eventType} setEventType={setEventType} />
			<EventDatePicker
				date={date}
				setDate={(date) => setDate(date?.toDate(getLocalTimeZone()) ?? null)}
			/>
			<Button
				color="primary"
				className="action w-fit-content rounded-none px-10 py-7"
				onPress={() => setIsOpen(true)}
			>
				Enquire Now
			</Button>
			<BookingFormModal
				initialValues={{ eventType, date }}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</div>
	)
}
