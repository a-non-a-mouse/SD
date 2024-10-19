import translations, { localization } from '../../translations/translations';
import './country-selector.css';

interface CountrySelectorProps {
  localization: localization;
  onChange: (country: keyof typeof translations) => void;
}

export default function CountrySelector({ onChange }: CountrySelectorProps) {
  function buildCountrySelector() {
    return Object.entries(translations)
      .sort(([, a], [, b]) => (a.country < b.country ? -1 : 1))
      .map(buildCountryItem);
  }

  function buildCountryItem([shortCountry, countryData]: [
    keyof typeof translations,
    localization,
  ]) {
    return (
      <div onClick={() => onChange(shortCountry)}>{countryData.country}</div>
    );
  }

  const countriesSelector = buildCountrySelector();
  return <div id="country-selector">{countriesSelector}</div>;
}
