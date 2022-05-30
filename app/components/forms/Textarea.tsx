
export const Textarea = ({ message, setMessage }: { message: string, setMessage: React.Dispatch<React.SetStateAction<string>> }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => setMessage(e.target.value);

  return (
    <textarea className="textarea" placeholder='Type something fun...' onChange={handleChange} value={message} />
  )
}
