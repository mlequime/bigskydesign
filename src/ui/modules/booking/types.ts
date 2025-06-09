export type EventType = 'conference' | 'wedding' | 'party' | 'other'
export const eventTypes: Array<{ value: EventType; label: string }> = [
	{ value: 'conference', label: 'Conference' },
	{ value: 'wedding', label: 'Wedding' },
	{ value: 'party', label: 'Party' },
	{ value: 'other', label: 'Other event' },
]
