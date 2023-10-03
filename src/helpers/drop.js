export const drop = (event, element) => {
  // Удаляем элемент, чтобы определить наиболее глубоко вложенный элемент по заданным координатам
  element.remove();
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);

  // Создаем коллекцию всех ячеек таблицы
  const cellCollection = document.getElementsByClassName('table-cell');

  // Проверка, принадлежит ли elemBelow какой-либо ячейке таблицы
  const targetCell = Array.prototype.find.call(cellCollection, (cell) => cell.contains(elemBelow));

  // Если есть ячейка таблицы под перемещаемым элементом
  if (targetCell) {

    // Если целевая ячейка таблицы не содержит элементов
    if (targetCell.dataset.count === '0') {
      return targetCell.dataset.id;
    }

    // Child в ячейке с тем же id или null
    const child = element.querySelector(`[data-id]`);
    const targetCellIChild = targetCell.querySelector(`[data-id="${child.dataset.id}"]`);
    return targetCellIChild ? targetCell.dataset.id : null;

  } else {
    return null;
  }
};
