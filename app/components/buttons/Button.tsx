interface Props extends React.ComponentPropsWithoutRef<"button"> {
	text: string;
}

export const Button = ({ text, onClick, type }: Props) => {
	return (
		<button className='btn' onClick={onClick} type={type}>{text}</button>
	)
}
