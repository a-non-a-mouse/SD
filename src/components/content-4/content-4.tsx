import { localization } from '../../translations/translations.js';
import { useUserContext } from '../contexts/user-context';

interface Content4Props {
  localization: localization;
}

export default function Content4(_: Content4Props) {
  const { orgLogo } = useUserContext();

  return (
    <div id="content-4" className="slider-content">
      <img id="org-logo" src={orgLogo} alt="" width="100%" />
    </div>
  );
}
