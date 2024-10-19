import './background.css';

import { constrain } from '../../utils/math';

export default function Background() {
  return <div id="radial-gradient" ref={animate}></div>;
}

function animate(gradient: HTMLDivElement) {
  let xPosition = -10;
  let yPosition = -10;
  let xSpeed = 0;
  let ySpeed = 0;
  let xDirection = 1;
  let yDirection = 1;
  const minPercent = -20;
  const maxPercent = 90;

  function resetSpeeds() {
    xSpeed = 0.4 + Math.random() / 5;
    ySpeed = 0.2 + Math.random() / 5;
  }

  function animateBox() {
    xPosition += xSpeed * xDirection;
    yPosition += ySpeed * yDirection;

    if (xPosition > maxPercent || xPosition < minPercent) {
      xPosition = constrain(xPosition, minPercent, maxPercent);
      xDirection *= -1;
      resetSpeeds();
    }
    if (yPosition > maxPercent || yPosition < minPercent) {
      yPosition = constrain(yPosition, minPercent, maxPercent);
      yDirection *= -1;
      resetSpeeds();
    }

    gradient.style.cssText = `left: ${xPosition}%; top: ${yPosition}%;`;

    requestAnimationFrame(animateBox);
  }

  resetSpeeds();
  animateBox();
}
