import { useState, type FormEvent } from 'react';

function ContactForm() {
	const [responseMessage, setResponseMessage] = useState(null);
	const [isSending, setIsSending] = useState(false);

	const successStyle = responseMessage === 'Success!' ? 'text-success' : 'text-error';

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (isSending) return;

		setIsSending(true);

		const formData = new FormData(e.target as HTMLFormElement);
		const response = await fetch('/api/contact', {
			method: 'POST',
			body: formData
		});
		const data = await response.json();
		if (data.message) {
			setResponseMessage(data.message);
		}

		setIsSending(false);
	}
	return (
		<form onSubmit={submit} className="flex flex-col gap-1">
			<h2>Contact me</h2>
			<label className="form-control">
				<span className="label-text">Name</span>
				<input
					type="text"
					id="name"
					name="name"
					required
					className="input input-bordered input-sm w-full"
				/>
			</label>
			<label className="form-control">
				<span className="label-text">Email</span>
				<input
					type="text"
					id="email"
					name="email"
					required
					className="input input-bordered input-sm w-full"
				/>
			</label>
			<label className="form-control">
				<span className="label-text">Message</span>

				<textarea
					id="message"
					name="message"
					required
					className="textarea textarea-bordered w-full"
				/>
			</label>
			<button
				className="btn btn-success btn-sm mt-3"
				disabled={isSending || !!responseMessage}
			>
				{isSending && <span className="loading loading-dots"></span>}
				Send
			</button>

			{responseMessage && <p className={`${successStyle} text-center`}>{responseMessage}</p>}
		</form>
	);
}

export default ContactForm;
