// Найти элемент с классом 'header__hamburger'
const hamburger = header.querySelector('.header__hamburger');
const hamburgerClose = header.querySelector('.header__close');
const hamburgerWrap = header.querySelector('.header__nav');

// if (hamburger)
const closeHamburger = () => {
    if (!hamburger) {
        console.error('Элемент hamburger отсутствует!')
        return;
    }

    hamburger.classList.remove('open');
    hamburgerWrap.classList.remove('slideInRight');
    hamburgerWrap.classList.add('slideOutRight');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
        hamburgerWrap.classList.add('menu-hidden');
    }, 1000);
}
// Проверить, существует ли элемент 'header__hamburger'
if (hamburger) {
    // Добавить обработчик события 'click' к элементу 'header__hamburger'
    hamburger.addEventListener('click', event => {
        // Предотвратить стандартное поведение события (например, переход по ссылке)
        event.preventDefault();

        // Проверить, содержит ли текущий элемент ('hamburger') класс 'open'
        if (hamburger.classList.contains('open')) {
            // Если содержит, удалить класс 'open' у элемента 'hamburger'
            closeHamburger();
        } else {
            // Если класс 'open' отсутствует у элемента 'hamburger'
            // Добавить класс 'open' к элементу 'hamburger'
            hamburger.classList.add('open');
            hamburger.classList.remove('close');
            // Добавить класс 'no-scroll' к элементу 'body', чтобы предотвратить прокрутку страницы
            document.body.classList.add('no-scroll');

            // Удалить класс 'slideInLeft' у элемента 'hamburgerWrap' и добавить класс 'slideOutLeft'
            // Это переключит анимацию меню с 'slide in' (заезд) на 'slide out' (выезд)
            hamburgerWrap.classList.remove('slideOutRight');
            hamburgerWrap.classList.add('slideInRight');
            hamburgerWrap.classList.remove('menu-hidden');
        }
    });
}

if (hamburgerClose) {
    hamburgerClose.addEventListener('click', (event) => {
        event.preventDefault();
        closeHamburger();
    });
}

document.addEventListener('click', function (e) {
    const target = e.target;
    const isHamburgerWrap = target.classList.contains('header__hamburger') || target.closest('.header__hamburger');

    if (!isHamburgerWrap) {
        // console.error('Элемент hamburger отсутствует!')
        return;
    }
    const isCloseButton = target.classList.contains('header__close');

    if (!isCloseButton) {
        // console.error('Элемент hamburger отсутствует!')
        return;
    }

    const isOpen = hamburgerWrap.classList.contains('slideInRight');

    if (isHamburgerWrap || isCloseButton || isOpen) {
        closeHamburger();
    }
});

hamburgerWrap.querySelectorAll('.header__nav-item').forEach(navItem => {
    navItem.addEventListener('click', () => {
        closeHamburger();
    });
});
