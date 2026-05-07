import useIsMobile from '@hooks/isMobile';
import DesktopNavMenu from './DesktopNavMenu';
import MobileNavMenu from './MobileNavMenu';

const NavMenu = () => (useIsMobile() ? <MobileNavMenu /> : <DesktopNavMenu />);

export default NavMenu;
