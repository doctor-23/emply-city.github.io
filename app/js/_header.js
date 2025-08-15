/**
 * Функция для управления состоянием меню в зависимости от прокрутки страницы.
 *
 * @param {Object} item - Объект window, который содержит информацию о текущей прокрутке страницы.
 * @param {Boolean} onScroll - Флаг, указывающий, что вызвана функция при скролле.
 */
function stickyMenu(item) {
    document.getElementById('header_id').classList.toggle('_scroll', item.pageYOffset > 0);
}

// Вызываем функцию stickyMenu при загрузке страницы с текущим объектом window
stickyMenu(window);

// Добавляем обработчик события прокрутки страницы
window.addEventListener('scroll', function () {
    // Вызываем функцию stickyMenu при каждом событии прокрутки
    stickyMenu(this);
});
