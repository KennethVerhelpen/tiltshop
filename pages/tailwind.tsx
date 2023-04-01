import SelectUnstyled from '@mui/base/SelectUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import { ArrowForwardRounded } from '@mui/icons-material';
import { Icon } from '@mui/material';

const optionStyled = {
	root: {
		className: 'rounded-md hover:bg-gray-50 px-4 py-2 text-sm',
	}
}

export const Tailwind = () => {
	return (
		<div className="h-screen w-screen flex place-items-center justify-center">
			<SelectUnstyled
				defaultValue={10}
				slotProps={{
					root: { className: 'mx-1 rounded-md text-sm self-center bg-blue-600 text-slate-50 drop-shadow-sm border border-blue-700 shadow-blue-600 px-4 py-2 w-min active:bg-blue-700 '},
					popper: { 
						className: 'bg-white drop-shadow-xl rounded-md border border-gray-200' },
					listbox: {
						className:
							'cursor-pointer',
					},
				}}>
				<OptionUnstyled slotProps={optionStyled} value={10}>Ten</OptionUnstyled>
				<OptionUnstyled slotProps={optionStyled} value={20}>Twenty</OptionUnstyled>
				<OptionUnstyled slotProps={optionStyled} value={30}>Thirty</OptionUnstyled>
			</SelectUnstyled>
			<SelectUnstyled
				defaultValue={10}
				slotProps={{
					root: { className: 'mx-1 rounded-md text-sm self-center bg-white drop-shadow-sm border border-grey-200 px-4 py-2 w-min'},
					popper: { 
						className: 'bg-white drop-shadow-xl rounded-md border border-gray-200' },
					listbox: {
						className:
							'cursor-pointer',
					},
				}}>
				<OptionUnstyled slotProps={optionStyled} value={10}>
					<span>Ten</span>
				</OptionUnstyled>
				<OptionUnstyled slotProps={optionStyled} value={20}>Twenty</OptionUnstyled>
				<OptionUnstyled slotProps={optionStyled} value={30}>Thirty</OptionUnstyled>
			</SelectUnstyled>
			<Icon
				baseClassName="text-sm"
				className="text-sm arrow-forward-rounded"
			/>
		</div>
	);
};

export default Tailwind;