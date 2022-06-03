import React, { useState } from 'react'
import { signMessage } from '~/utils/matamask-provider';
import { Button } from '../buttons/Button';
import { Textarea } from '../forms/Textarea';

export const SignMessageForm = ({ setSignature }: { setSignature: React.Dispatch<React.SetStateAction<string | null>> }) => {
	const [message, setMessage] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const sig = await signMessage(message, setError);

		setError(null);
		if (sig)
			setSignature(sig);
	};

	return (
		<>
			<img src="/images/metamask-logo.svg" alt="Metamask logo" />
			<form onSubmit={handleSubmit}>
				<Textarea message={message} setMessage={setMessage} />
				{error && <p>{error}</p>}
				<Button text="Sign message using Metamask" />
			</form>
		</>
	)
}
