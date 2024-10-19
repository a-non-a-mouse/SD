import { useEffect, useState } from 'react';
import './footer.css';
import { localization, countries } from '../../translations/translations';
import QRCode from 'react-qr-code';
import CountrySelector from '../country-selector/country-selector';

interface FooterProps {
  localization: localization;
  changeCountry: (country: countries) => void;
}

export default function Footer({ localization, changeCountry }: FooterProps) {
  const { locale, url } = localization;
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<string>();
  const [countryPopupVisible, setCountryPopupVisibility] =
    useState<boolean>(false);

  function tickClock() {
    const now = new Date();
    const localizedDate = now.toLocaleString(locale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const localizedTime = now.toLocaleString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    setDate(localizedDate);
    setTime(localizedTime);
  }

  useEffect(
    function () {
      const interval = setInterval(tickClock, 1010);

      return () => {
        clearTimeout(interval);
      };
    },
    [locale]
  );

  function toggleCountryPopup() {
    setCountryPopupVisibility(!countryPopupVisible);
  }

  function selectCountry(country: countries) {
    setCountryPopupVisibility(false);
    changeCountry(country);
  }

  return (
    <div id="footer">
      <a href={url} target="_blank">
        <QRCode id="qr-code" size={128} value={url} viewBox={`0 0 128 128`} />
      </a>
      <div id="current-date">{date}</div>
      <div id="current-time">{time}</div>
      <div id="star-box" onClick={toggleCountryPopup}>
        <svg viewBox="0 0 260 245" id="star">
          <path d="m56,237 74-228 74,228L10,96h240" />
        </svg>
      </div>
      {countryPopupVisible && (
        <CountrySelector onChange={selectCountry} localization={localization} />
      )}
    </div>
  );
}
