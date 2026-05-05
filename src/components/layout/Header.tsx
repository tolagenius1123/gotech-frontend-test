import MobileMenu from './MobileMenu';
import GoTechIcon from '@/assets/icons/GoTechIcon';

const Header = () => {
	return (
		<div className="w-full fixed z-50 bg-white flex md:hidden justify-between items-center px-6 py-3 border-b border-b-3line-dark-gray">
			<div className="w-full flex items-center gap-2">
				<GoTechIcon className="h-12 w-12" />

				<p className="font-semibold text-gotech-primary text-lg md:text-2xl">GoTech</p>
			</div>

			<MobileMenu />
		</div>
	);
};

export default Header;
