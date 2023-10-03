import { drop } from './drop.js';
import Cursor from '@/assets/clarity_cursor-hand-grab-line.svg';

export const drag = (event, element, moveCb) => {
  const { top, left } = element.getBoundingClientRect();
  const shiftY = event.pageY - top;
  const shiftX = event.pageX - left;

  let isDragStart = false;
  const clonedElement = element.cloneNode(true);

  const moveAt = (top, left) => {
    clonedElement.style.top = top - shiftY + 'px';
    clonedElement.style.left = left - shiftX + 'px';
  };

  function onMouseMove(event) {
    if (!isDragStart) {
      document.body.append(clonedElement);
      clonedElement.style.position = 'absolute';
      clonedElement.style.zIndex = 999;
      clonedElement.style.border = '1px solid var(--primary-border, #4D4D4D)';
      clonedElement.style.borderRadius = '24px';
      clonedElement.style.background = 'var(--secondary-bg, #262626)';
      clonedElement.style.cursor = `url(${Cursor}), pointer`;

      isDragStart = true;
    }

    moveAt(event.pageY, event.pageX);
  }

  document.addEventListener('mousemove', onMouseMove);

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('mouseup', onMouseUp);
  };

  element.addEventListener('mouseup', onMouseUp);

  const onMouseUpCloned = (event) => {
    document.removeEventListener('mousemove', onMouseMove);
    clonedElement.removeEventListener('mouseup', onMouseUpCloned);

    const targetCellId = drop(event, clonedElement);

    if (targetCellId) {
      moveCb(targetCellId);
    }
  };

  clonedElement.addEventListener('mouseup', onMouseUpCloned);
};
