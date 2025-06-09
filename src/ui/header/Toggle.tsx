import { FaBars, FaXmark } from 'react-icons/fa6'

export default function Toggle() {
	return (
		<label className="px-4 py-3 text-sm uppercase tracking-wide text-primary [grid-area:toggle] lg:hidden">
			<input id="header-open" type="checkbox" hidden />

			<span className="header-open:hidden">Menu</span>
			<span className="header-closed:hidden">Close</span>
		</label>
	)
}
