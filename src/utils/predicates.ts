export function isTouchEvent(
  e: React.TouchEvent | React.MouseEvent
): e is React.TouchEvent {
  return e && e.nativeEvent instanceof TouchEvent;
}

export function isMouseEvent(
  e: React.MouseEvent | React.MouseEvent
): e is React.MouseEvent {
  return e && e.nativeEvent instanceof MouseEvent;
}
