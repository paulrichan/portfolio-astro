import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData();
	const name = data.get('name');
	const email = data.get('email');
	const message = data.get('message');

	try {
		const resEmail = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${import.meta.env.RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: 'contact@portfolio.paulrichan.dev',
				to: 'paulrichan@icloud.com',
				subject: 'Portfolio Contact Form',
				html: `<p>${name} - ${email}</p><p>${message}</p>`
			})
		});

		return new Response(
			JSON.stringify({
				message: 'Success!'
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: 'Error!'
			}),
			{ status: 500 }
		);
	}
};
