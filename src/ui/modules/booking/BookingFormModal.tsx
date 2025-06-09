'use client'
import { getLocalTimeZone } from '@internationalized/date'
import { Button } from '@nextui-org/button'
import { Input, Textarea } from '@nextui-org/input'
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/modal'
import { DateValue } from '@nextui-org/react'
import { useDateFormatter } from '@react-aria/i18n'
import { Field, Form, Formik } from 'formik'
import { FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaEnvelope, FaPaperPlane, FaPhone } from 'react-icons/fa6'
import * as Yup from 'yup'
import { EventDatePicker } from './controls/EventDatePicker'
import { EventTypePicker } from './controls/EventTypePicker'
import { useRouter } from 'next/navigation'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const phoneRegex = /^\+?[0-9]{7,15}$/

const BookingSchema = Yup.object({
	email: Yup.string()
		.matches(emailRegex, 'Invalid email address')
		.required('Email is required'),
	phone: Yup.string().matches(phoneRegex, 'Invalid phone number').optional(),
	eventType: Yup.string().required('Event type is required'),
	date: Yup.date()
		.nullable()
		.transform((curr, orig) => (curr === '' ? null : curr)),
	additionalInfo: Yup.string().optional(),
})

type BookingSchemaType = ReturnType<typeof BookingSchema.validateSync>

export const BookingFormModal: FC<{
	initialValues: {
		eventType: string
		date: Date | null
	}
	isOpen: boolean
	onClose: () => void
}> = ({ initialValues, isOpen, onClose }) => {
	const router = useRouter()

	const navigate = (path: string) => {
		router.push(path)
	}
	const formatter = useDateFormatter({ dateStyle: 'full' })
	const { isLoading, handleSubmit } = useSubmit({ onClose, navigate })

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-[600px] rounded-none"
			classNames={{ body: 'rounded-none', wrapper: 'rounded-none' }}
		>
			<ModalContent>
				<ModalHeader>Book Your Event</ModalHeader>
				<ModalBody>
					<Formik
						initialValues={{
							...initialValues,
							email: '',
							phone: '',
							additionalInfo: '',
						}}
						validationSchema={BookingSchema}
						onSubmit={handleSubmit}
						validateOnBlur
						validateOnChange
					>
						{({ values, setFieldValue, errors, touched }) => (
							<Form className="flex flex-col space-y-5">
								<div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
									<div>
										<EventTypePicker
											eventType={values.eventType}
											setEventType={(value) =>
												setFieldValue('eventType', value)
											}
										/>

										{errors.eventType && touched.eventType && (
											<p className="text-xs text-orange-500">
												{errors.eventType}
											</p>
										)}
									</div>
									<div>
										<EventDatePicker
											date={values.date}
											setDate={(value) =>
												setFieldValue('date', value?.toDate(getLocalTimeZone()))
											}
										/>
										{errors.date && touched.date && (
											<p className="text-xs text-orange-500">{errors.date}</p>
										)}
									</div>
								</div>
								<div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
									<div>
										<Field
											name="email"
											as={Input}
											label="Your email address"
											placeholder="Enter your email address"
											classNames={{
												inputWrapper: 'rounded-none',
											}}
											endContent={<FaEnvelope className="text-gray-500" />}
										/>
										{errors.email && touched.email && (
											<p className="text-xs text-orange-500">{errors.email}</p>
										)}
									</div>
									<div>
										<Field
											name="phone"
											as={Input}
											label={
												<span>
													Your phone number{' '}
													<span className="text-[0.625rem] font-bold">
														(Optional)
													</span>
												</span>
											}
											placeholder="Enter your phone number"
											classNames={{
												inputWrapper: 'rounded-none',
											}}
											endContent={<FaPhone className="text-gray-500" />}
										/>
										{errors.phone && touched.phone && (
											<p className="text-xs text-orange-500">{errors.phone}</p>
										)}
									</div>
								</div>

								<div>
									<p className="text-sm text-gray-500">
										Provide any additional information for your{' '}
										{values.eventType || 'event'} on{' '}
										{values.date
											? formatter.format(values.date)
											: 'a future date'}
										.
									</p>
								</div>
								<div>
									<Field
										name="additionalInfo"
										as={Textarea}
										label="Extra details"
										placeholder="Type your additional information here."
										classNames={{
											inputWrapper: 'rounded-none',
										}}
									/>
									{errors.additionalInfo && touched.additionalInfo && (
										<p className="text-xs text-orange-500">
											{errors.additionalInfo}
										</p>
									)}
								</div>
								<p className="text-sm text-gray-500">
									We will get back to you as soon as possible.
								</p>
								<ModalFooter>
									<Button
										color="primary"
										type="submit"
										className="action rounded-none"
										isDisabled={isLoading}
									>
										<FaPaperPlane />
										Send
									</Button>
								</ModalFooter>
							</Form>
						)}
					</Formik>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

const useSubmit = ({
	onClose,
	navigate,
}: {
	onClose: () => void
	navigate?: (path: string) => void
}) => {
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = (values: BookingSchemaType) => {
		console.log('Sending booking request:', values)
		setIsLoading(true)
		fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: values.email,
				phone: values.phone,
				eventType: values.eventType ?? 'Other',
				date: values.date?.toString(),
				additionalInfo: values.additionalInfo,
			}),
		})
			.then((response) => {
				if (response.ok) {
					toast.success('Booking request sent successfully!')
					if (navigate) {
						navigate('/thank-you')
					}
					onClose()
				} else {
					toast.error(
						'Something went wrong while trying to send your booking request. Please try again later.',
					)
					console.error('Error sending booking request')
				}
			})
			.catch((error) => {
				console.error('Error sending booking request:', error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return {
		handleSubmit,
		isLoading,
	}
}
