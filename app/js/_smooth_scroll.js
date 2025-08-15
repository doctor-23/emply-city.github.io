// Функция для плавной прокрутки к якорю
function smoothScroll(e) {
    e.preventDefault(); // Отменяем стандартное поведение ссылки
    // Получаем ID якоря из атрибута data-href или href
    const targetId = this.getAttribute('data-href') || this.getAttribute('href');
    // Находим элемент с нужным ID
    const targetElement = document.querySelector(targetId);
    const duration = 1000; // Длительность анимации прокрутки (в миллисекундах)
    if (targetElement) { // Проверяем, найден ли элемент с нужным ID
        const targetOffsetTop = targetElement.offsetTop; // Получаем вертикальное смещение элемента относительно верхнего края страницы
        // Прокручиваем страницу до элемента с плавной анимацией
        window.scrollTo({
            top: targetOffsetTop,
            behavior: 'smooth' // Опция для плавной прокрутки
        });
    }
}

// Получаем все ссылки, которые начинаются с "#" или имеют атрибут data-href, начинающийся с "#"
const links = document.querySelectorAll('a[href^="#"],*[data-href^="#"]');
// Перебираем все найденные ссылки и назначаем им обработчик события клика для плавной прокрутки
links.forEach(link => {
    link.addEventListener('click', smoothScroll);
});
