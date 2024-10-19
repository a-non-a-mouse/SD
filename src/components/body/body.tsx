import { localization } from '../../translations/translations.js';
import Content1 from '../content-1/content-1';
import Content2 from '../content-2/content-2';
import Content3 from '../content-3/content-3';
import Content4 from '../content-4/content-4';
import Slider from '../slider/slider';
import './body.css';

interface BodyProps {
  localization: localization;
}

export default function Body({ localization }: BodyProps) {
  return (
    <div id="body">
      <Slider>
        <Content1 localization={localization} key="content-1" />
        <Content2 localization={localization} key="content-2" />
        <Content3 localization={localization} key="content-3" />
        <Content4 localization={localization} key="content-4" />
      </Slider>
    </div>
  );
}
