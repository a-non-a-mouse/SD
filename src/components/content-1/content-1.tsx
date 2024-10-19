import { localization } from '../../translations/translations.js';
import './content-1.css';
import profilePhoto from '../../images/profile-photo.jpg';
import { useUserContext } from '../contexts/user-context';

interface Content1Props {
  localization: localization;
}

export default function Content1({
  localization: { license, handler_name, dog_name, expiration, certified },
}: Content1Props) {
  const { expirationDate, orgName, ownerName, dogName } = useUserContext();

  return (
    <div id="content-1" className="slider-content">
      <div id="right-bar">
        <img id="photo" src={profilePhoto} width="195" alt="" />
        <div id="certified">{certified.toUpperCase()}</div>
        <div id="expiration-box">
          <h2>{expiration}</h2>
          <h3>{expirationDate}</h3>
        </div>
      </div>
      <h1>{orgName}</h1>
      <h3>{license}</h3>
      <h2>{handler_name}</h2>
      <h3>{ownerName}</h3>
      <h2>{dog_name}</h2>
      <h3>{dogName}</h3>
    </div>
  );
}
