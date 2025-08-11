export type LeadPayload = {
	name: string
	email: string
	phone: string
	company: string
	position: string
	interest: string
	challenge: string
	source?: string
}

function getEndpoint(): string | null {
	return import.meta.env.VITE_FORM_ENDPOINT || import.meta.env.VITE_SHEETS_WEBAPP_URL || null
}

export async function submitLead(payload: LeadPayload & { timestamp?: string; source?: string }): Promise<{ ok: boolean; message?: string }>{
	const endpoint = getEndpoint()
	const defaultEndpoint = 'https://script.google.com/macros/s/AKfycbzwIqvG-_wFdrm7_ckSTeGvGZcgcfm9gV3nPD4EM_JHqpCemP_EepxCKC9LX13SUEny/exec'
	const url = endpoint || defaultEndpoint
	if (!url) {
		console.warn('Form endpoint is not configured. Set VITE_FORM_ENDPOINT or VITE_SHEETS_WEBAPP_URL')
		return { ok: true, message: 'No endpoint configured (dev mode).' }
	}

	const params = new URLSearchParams()
	params.set('name', payload.name)
	params.set('email', payload.email)
	params.set('phone', payload.phone)
	params.set('company', payload.company)
	params.set('position', payload.position)
	params.set('interest', payload.interest)
	params.set('challenge', payload.challenge)
	params.set('timestamp', payload.timestamp || new Date().toISOString())
	params.set('source', payload.source || (typeof window !== 'undefined' ? window.location.href : ''))

	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
		body: params.toString(),
		mode: 'cors',
	})

	if (!res.ok) {
		const text = await res.text().catch(() => '')
		throw new Error(text || 'Request failed')
	}
	return { ok: true }
}

