import { localization } from '../../translations/translations.js';
import { useUserContext } from '../contexts/user-context';

interface Content2Props {
  localization: localization;
}

export default function Content2({
  localization: { dog_breed, dog_microchip, dog_service },
}: Content2Props) {
  const { dogBreed, dogMicrochip, dogService } = useUserContext();

  return (
    <div id="content-2" className="slider-content">
      <h2>{dog_breed}</h2>
      <h3>{dogBreed}</h3>
      <h2>{dog_microchip}</h2>
      <h3>{dogMicrochip}</h3>
      <h2>{dog_service}</h2>
      <h3>{dogService}</h3>
    </div>
  );
}
