import { localization } from '../../translations/translations.js';
import { useUserContext } from '../contexts/user-context';

interface Content3Props {
  localization: localization;
}

export default function Content3({
  localization: { test_date, registration_num, handler_address, handler_phone },
}: Content3Props) {
  const { testDate, registrationNum, handlerAddress, handlerPhone } =
    useUserContext();

  return (
    <div id="content-3" className="slider-content">
      <h2>{test_date}</h2>
      <h3>{testDate}</h3>
      <h2>{registration_num}</h2>
      <h3>{registrationNum}</h3>
      <h2>{handler_address}</h2>
      <h3>{handlerAddress}</h3>
      <h2>{handler_phone}</h2>
      <h3>{handlerPhone}</h3>
    </div>
  );
}
