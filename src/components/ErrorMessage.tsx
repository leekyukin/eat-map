interface ErrorMessageProps {
	message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
	return (
		<div className="mx-auto h-screen w-full pt-[10%] text-center font-semibold text-red-500">
			{message}
		</div>
	);
};
