export function contains(container, rect) {
  const otherWidth = rect.width || 0;
  const otherHeight = rect.height || 0;
  return container.x <= rect.x &&
    container.y <= rect.y &&
    container.x + container.width >= rect.x + otherWidth &&
    container.y + container.height >= rect.y + otherHeight;
}

export function merge(rects) {
  for (let i = 0; i < rects.length; i++) {
    let rect = rects[i];
    let j = 0;
    let compareRect = rects[i + j];
    while (compareRect) {
      if (compareRect === rect) {
        j++; // next
      } else if (contains(compareRect, rect)) {
        // remove rect
        rects.splice(i, 1);
        rect = rects[i]; // set next rect
        compareRect = null;
        continue;
      } else if (contains(rect, compareRect)) {
        // remove compareRect
        rects.splice(i + j, 1);
      } else {
        j++;
      }
      compareRect = rects[i + j]; // set next compareRect
    }
  }
}

export function overlaps(a, b) {
  const aRight = a.x + a.width;
  const aBottom = a.y + a.height;
  const bRight = b.x + b.width;
  const bBottom = b.y + b.height;

  return a.x < bRight &&
    aRight > b.x &&
    a.y < bBottom &&
    aBottom > b.y;
}

export function subtract(a, b) {
  const free = [];

  const aRight = a.x + a.width;
  const aBottom = a.y + a.height;
  const bRight = b.x + b.width;
  const bBottom = b.y + b.height;

  // top
  if (a.y < b.y) {
    free.push({
      x: a.x,
      y: a.y,
      width: a.width,
      height: b.y - a.y,
    });
  }

  // right
  if (aRight > bRight) {
    free.push({
      x: bRight,
      y: a.y,
      width: aRight - bRight,
      height: a.height,
    });
  }

  // bottom
  if (aBottom > bBottom) {
    free.push({
      x: a.x,
      y: bBottom,
      width: a.width,
      height: aBottom - bBottom,
    });
  }

  // left
  if (a.x < b.x) {
    free.push({
      x: a.x,
      y: a.y,
      width: b.x - a.x,
      height: a.height,
    });
  }
  return free;
}

export function fits(a, b) {
  return a.width >= b.width && a.height >= b.height;
}
