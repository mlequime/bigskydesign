// pages/api/contact.js

import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import DOMPurify from 'isomorphic-dompurify'

export async function POST(request: NextRequest) {
	try {
		// Get form data from request body
		const body = await request.json()
		if (!body) {
			return NextResponse.json({ message: 'No data provided' }, { status: 400 })
		}

		// // Sanitize input data
		const { phone, eventType, email, additionalInfo } = {
			eventType: DOMPurify.sanitize(body.eventType),
			phone: DOMPurify.sanitize(body.phone),
			email: DOMPurify.sanitize(body.email),
			additionalInfo: DOMPurify.sanitize(body.additionalInfo),
		}

		// Basic validation
		if (!email) {
			return NextResponse.json(
				{ message: 'Please fill in the required fields' },
				{ status: 400 },
			)
		}

		// Initialize Resend
		if (
			!process.env.RESEND_API_KEY ||
			!process.env.RESEND_FROM_EMAIL ||
			!process.env.RESEND_TO_EMAIL
		) {
			return NextResponse.json(
				{
					message: 'Missing environment setup. Please contact the site admin.',
				},
				{ status: 500 },
			)
		}

		const resend = new Resend(process.env.RESEND_API_KEY)
		const { data, error } = await resend.emails.send({
			from: process.env.RESEND_FROM_EMAIL,
			to: process.env.RESEND_TO_EMAIL,
			subject: 'Booking Enquiry: ' + eventType,
			html: `<p><strong>Contact #:</strong> ${phone || 'None provided'}</p>
						<p><strong>Email:</strong> ${email}</p>
						<p><strong>Event Type:</strong> ${eventType || 'Other event'}</p>
						<p><strong>Additional Info:</strong> ${additionalInfo}</p>
						`,
			replyTo: email,
		})

		if (error) {
			console.error('Error sending email:', error)
			return NextResponse.json(
				{ message: 'Error sending email' },
				{ status: 500 },
			)
		}
		console.log('Response from resend:', data)
		return NextResponse.json(
			{ message: 'Email sent successfully' },
			{ status: 200 },
		)
	} catch (error) {
		console.error('Error sending email:', error)
		return NextResponse.json(
			{ message: 'Error sending email' },
			{ status: 500 },
		)
	}
}
