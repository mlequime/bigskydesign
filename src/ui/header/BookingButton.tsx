'use client'
import { Button, useDisclosure } from '@nextui-org/react'
import { BookingFormModal } from '../modules/booking/BookingFormModal'

export function BookingButton() {
	const { isOpen, onClose, onOpen } = useDisclosure()

	return (
		<>
			<Button
				color="primary"
				className="action inline-flex rounded-none px-10 py-7"
				onPress={onOpen}
			>
				Book Now
			</Button>
			<BookingFormModal
				initialValues={{ eventType: '', date: null }}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	)
}
