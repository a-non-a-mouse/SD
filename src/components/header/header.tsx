import { localization } from '../../translations/translations.js';
import './header.css';
import ADI from '../../images/adi.png';

interface HeaderProps {
  localization: localization;
}

export default function Header(props: HeaderProps) {
  return (
    <div id="header">
      <img id="logo" src={ADI} alt=""></img>
    </div>
  );
}
