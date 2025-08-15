class CustomSelect {
  /**
   * Конструктор класса CustomSelect.
   * @param {string} method - Название метода инициализации. Может быть 'init', 'reinit' или 'destroy'.
   * @param {Object} options - Объект с настройками.
   * @param {HTMLElement} options.selectElement - HTML-элемент, представляющий оригинальный выпадающий список.
   * @param {number} [options.show=8] - Количество элементов, которые нужно показать в выпадающем списке без прокрутки (по умолчанию 8).
   * @param {string} [options.icon=null] - Иконка для кастомного выпадающего списка. По умолчанию используется null.
   */
  constructor(method, options) {
    // Сохраняем переданный элемент выпадающего списка и количество элементов, которые нужно показать
    this.select = options.selectElement;
    this.show = options.show || 6;
    this.icon = options.icon || null;
    this.isMobile = document.documentElement.clientWidth < 575.98;

    // Если метод инициализации равен 'init', инициализируем пользовательский выпадающий список
    if (method === 'init') {
      this.initCustomSelect(this.select);
    } else {
      // Если метод не 'init', проверяем, является ли элемент select
      if (this.select.nodeName === 'DIV') {
        // Если элемент DIV, находим все радио-кнопки внутри него
        this.options = this.select.querySelectorAll('input[type="radio"]');
        // Создаем стандартный выпадающий список
        this.defaultSelect = this.createDefaultSelect();
        // Заменяем пользовательский выпадающий список на стандартный
        this.replaceCustomWithDefault();

        // Если метод переинициализации равен 'reinit', повторно инициализируем пользовательский выпадающий список
        if (method === 'reinit') {
          this.initCustomSelect(this.defaultSelect);
        }
      }
    }
  }

  /**
   * Инициализирует кастомный выпадающий список на основе оригинального элемента select.
   * @param {HTMLElement} select - HTML-элемент, представляющий оригинальный выпадающий список.
   */
  initCustomSelect(select) {
    // Получаем список опций выпадающего списка
    this.options = select.querySelectorAll('option');
    this.select = select;
    // Создаем кастомный выпадающий список и настраиваем его обработчики событий
    const customSelect = this.createCustomSelect(select);
    // Заменяем оригинальный выпадающий список кастомным
    this.replaceSelectWithCustom(customSelect);
    // Назначаем обработчики событий для кастомного выпадающего списка
    this.customSelectEvents(customSelect);
    customSelect.classList.add('initialized');
  }

  /**
   * Создает кастомный выпадающий список на основе переданного оригинального элемента select.
   * @param {HTMLElement} select - HTML-элемент, представляющий оригинальный выпадающий список.
   * @returns {HTMLElement} - HTML-элемент, представляющий кастомный выпадающий список.
   */
  createCustomSelect(select) {
    // Создаем новый div и копируем классы из оригинального селекта
    let selectClasses = Array.from(select.classList);
    let customSelect = document.createElement('div');
    selectClasses.forEach(className => customSelect.classList.add(className));
    customSelect.classList.add('custom-select');
    if (select.required) {
      customSelect.classList.add('required');
    }

    // Создаем заголовок и содержимое списка выбора
    let selectTitle = this.createCustomSelectTitle(customSelect);
    let selectContent = this.createCustomSelectContent(customSelect);

    // Добавляем заголовок и содержимое к новому выпадающему списку
    customSelect.append(selectTitle);
    customSelect.append(selectContent);
    return customSelect;
  }

  /**
   * Создает заголовок для кастомного выпадающего списка.
   * @returns {HTMLElement} - HTML-элемент, представляющий заголовок кастомного выпадающего списка.
   */
  createCustomSelectTitle(customSelect) {
    // Получаем все опции выбора и преобразуем их в массив
    let optionsArray = Array.from(this.options);

    // Находим выбранную опцию
    let selectedOption = optionsArray.find(option => option.selected);
    // Создаем элементы для заголовка кастомного селекта
    let selectTitle = document.createElement('div'); // Создаем div для обертки заголовка
    let selectTitleText = document.createElement('div'); // Создаем div для текста заголовка
    let selectTitleIcon = document.createElement('div'); // Создаем div для иконки заголовка

    // Если иконка не задана, используем иконку стрелки вниз по умолчанию
    if (this.icon === null) {
      this.icon = '<svg width="12" height="9" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.64637 6.0565L0.353478 1.7636C0.158216 1.56834 0.158216 1.25176 0.353478 1.0565L1.05686 0.353112C1.25193 0.158042 1.56814 0.157822 1.76348 0.352619L4.99992 3.58005L8.23637 0.352619C8.43171 0.157822 8.74792 0.158042 8.94299 0.353112L9.64637 1.0565C9.84163 1.25176 9.84163 1.56834 9.64637 1.7636L5.35348 6.0565C5.15822 6.25176 4.84163 6.25176 4.64637 6.0565Z" fill="currentColor"/></svg>';
    }

    // Добавляем классы для стилизации
    selectTitle.classList.add('select-title'); // Добавляем класс для обертки заголовка
    selectTitleText.classList.add('select-title__text'); // Добавляем класс для текста заголовка
    selectTitleIcon.classList.add('select-title__icon'); // Добавляем класс для иконки заголовка
    // Устанавливаем текст заголовка и иконку
    selectTitleText.textContent = selectedOption.textContent; // Устанавливаем текст заголовка из выбранной опции
    selectTitleIcon.innerHTML = this.icon; // Устанавливаем иконку заголовка

    // Добавляем текст и иконку к заголовку
    selectTitle.append(selectTitleText); // Добавляем текст заголовка в обертку
    selectTitle.append(selectTitleIcon); // Добавляем иконку заголовка в обертку

    if (selectedOption.value !== '') {
      customSelect.classList.add('active');
    }
    return selectTitle; // Возвращаем сформированный заголовок
  }

  /**
   * Создает контент для кастомного выпадающего списка.
   * @returns {HTMLElement} - HTML-элемент, представляющий контент кастомного выпадающего списка.
   */
  createCustomSelectContent() {
    // Создаем контейнер для содержимого выпадающего списка
    let selectContent = document.createElement('div');
    selectContent.classList.add('select-content');

    // Создаем обертку для опций и добавляем их
    let selectContentWrap = this.createCustomSelectOptions();
    selectContent.append(selectContentWrap);
    if (this.isMobile) {
      let overlay = document.createElement('div');
      overlay.classList.add('select-content_overlay');
      selectContent.append(overlay);
    }
    return selectContent;
  }

  /**
   * Создает обертку для опций кастомного выпадающего списка.
   * @returns {HTMLElement} - HTML-элемент, представляющий обертку для опций кастомного выпадающего списка.
   */
  createCustomSelectOptions() {
    // Создаем обертку для опций
    let selectContentWrap = document.createElement('div');
    selectContentWrap.classList.add('select-content_wrap');

    // Перебираем опции оригинального селекта и создаем для каждой опции метку
    this.options.forEach((option, index) => {
      // console.log(option)
      // Создаем элементы метки и радио-кнопки
      const label = document.createElement('label');
      const input = document.createElement('input');
      const span = document.createElement('span');

      // Добавляем созданным элементам классы
      label.classList.add('select-content__wrapper');
      span.classList.add('select-content__radio');

      // Добавляем радио-кнопке атрибуты и устанавливаем ей тип и имя
      const optionAttributes = [...option.attributes];
      // Перебираем массив атрибутов `<option>`
      optionAttributes.map(attribute => {
        if (attribute.name === 'selected') {
          input.setAttribute('checked', 'checked');
          input.checked = true;
        } else {
          input.setAttribute(attribute.name, attribute.value);
        }
        if (attribute.name === 'disabled') {
          label.classList.add('disabled');
        }
      });
      input.setAttribute('type', 'radio');
      input.setAttribute('name', this.select.name);

      // Устанавливаем текст метки
      // span.textContent = option.textContent.trim();
      // console.log(option)
      span.innerHTML = option.innerHTML;

      // Добавляем радио-кнопку и метку в обертку опций
      label.append(input);
      label.append(span);
      selectContentWrap.appendChild(label);
    });
    return selectContentWrap;
  }

  /**
   * Заменяет оригинальный выпадающий список кастомным.
   * @param {HTMLElement} select - HTML-элемент, представляющий кастомный выпадающий список.
   */
  replaceSelectWithCustom(select) {
    // Заменяем оригинальный выпадающий список кастомным
    this.select.replaceWith(select);
  }

  /**
   * Назначает обработчики событий для кастомного выпадающего списка.
   * @param {HTMLElement} select - HTML-элемент, представляющий кастомный выпадающий список.
   */
  customSelectEvents(select) {
    // Находим заголовок и содержимое списка выбора в кастомном выпадающем списке
    let title = select.querySelector('.select-title');
    let titleText = select.querySelector('.select-title__text');
    let content = select.querySelector('.select-content');

    // Находим все метки в списке выбора
    let labels = content.querySelectorAll('.select-content__wrapper');
    let labelCount = labels.length;
    let labelHeight = 0;

    // Вычисляем высоту блока меток, которые будут показаны
    labels.forEach((label, index) => {
      if (index + 1 <= this.show) {
        console.log(label.offsetHeight);
        labelHeight += label.offsetHeight;
      }

      // Добавляем обработчик события клика для каждой метки
      label.addEventListener('click', () => {
        // Получаем текст выбранной метки
        let labelText = label.querySelector('.select-content__radio').textContent;
        let input = label.querySelector('input');
        let inputValue = input.value;

        // делаем input выбранным
        input.checked = true;
        // Изменяем текст заголовка списка выбора
        titleText.textContent = labelText;
        // Закрываем список выбора
        select.classList.remove('open');
        console.log(this.isMobile);
        if (this.isMobile) {
          document.body.classList.remove('no-scroll');
          document.querySelector('main').classList.remove('layer-up');
        }
        // добавляем класс, после первого выбора
        if (!select.classList.contains('active')) {
          select.classList.add('active');
        }
        if (inputValue === '') {
          select.classList.remove('active');
        } else {
          title.classList.remove('validate');
        }
      });
    });

    // Если количество меток меньше или равно количеству меток, которые нужно показать,
    // то добавляем класс no-scroll для предотвращения прокрутки
    if (labelCount <= this.show) {
      content.classList.add('no-scroll');
    }

    // Устанавливаем максимальную высоту блока меток
    content.style.maxHeight = labelHeight + 20 + 'px';

    // Добавляем обработчик события клика для заголовка списка выбора
    title.addEventListener('click', () => {
      // Закрываем все открытые списки выбора
      document.querySelectorAll('.select').forEach(item => {
        if (item !== select) {
          item.classList.remove('open');
          if (this.isMobile) {
            document.body.classList.remove('no-scroll');
            document.querySelector('main').classList.remove('layer-up');
          }
        }
      });

      // Открываем или закрываем список выбора
      select.classList.toggle('open');
      if (this.isMobile) {
        document.body.classList.toggle('no-scroll');
        document.querySelector('main').classList.toggle('layer-up');
      }
    });

    // Добавляем обработчик события клика вне кастомного выпадающего списка
    this.clickOutsideSelect(select, title);
  }

  /**
   * Обрабатывает событие клика вне кастомного выпадающего списка.
   * @param {HTMLElement} select - HTML-элемент, представляющий кастомный выпадающий список.
   * @param {HTMLElement} title - HTML-элемент, представляющий заголовок списка выбора.
   */
  clickOutsideSelect(select, title) {
    document.addEventListener('click', e => {
      let target = e.target;
      let itsEl = target == select || select.contains(target);
      let its_btn = target == title;
      let its_overlay = target.classList.contains('select-content_overlay');
      let its_el_is_open = select.classList.contains('open');

      // Закрываем выпадающий список, если произошел клик вне его области
      if (!itsEl && !its_btn && its_el_is_open) {
        select.classList.toggle('open');
        if (this.isMobile) {
          document.body.classList.toggle('no-scroll');
        }
      }
      if (its_overlay && its_el_is_open) {
        select.classList.remove('open');
        if (this.isMobile) {
          document.body.classList.remove('no-scroll');
          document.querySelector('main').classList.remove('layer-up');
        }
      }
    });
  }

  /**
   * Заменяет кастомный выпадающий список на оригинальный.
   */
  replaceCustomWithDefault() {
    this.select.replaceWith(this.defaultSelect);
  }

  /**
   * Создает оригинальный выпадающий список.
   * @returns {HTMLSelectElement} - Созданный оригинальный выпадающий список.
   */
  createDefaultSelect() {
    // Получаем классы из кастомного селекта
    const customSelect = this.select;
    let selectClasses = Array.from(customSelect.classList);

    // Создаем элемент select
    let defaultSelect = document.createElement('select');

    // Получаем имя оригинального селекта
    let selectName = this.options[0].name;

    // Добавляем классы к созданному селекту
    selectClasses.forEach(className => defaultSelect.classList.add(className));
    defaultSelect.classList.remove('active', 'custom-select', 'required');
    if (customSelect.classList.contains('required')) {
      defaultSelect.required = true;
    }

    // Устанавливаем имя оригинального селекта
    defaultSelect.name = selectName;

    // Добавляем остальные опции
    this.options.forEach(input => {
      defaultSelect.append(this.createDefaultOptions(input));
    });
    return defaultSelect;
  }

  /**
   * Создает опцию для оригинального выпадающего списка.
   * @param {HTMLInputElement} input - Элемент input из кастомного селекта.
   * @returns {HTMLOptionElement|boolean} - Созданная опция для оригинального выпадающего списка или false, если input не содержит значения.
   */
  createDefaultOptions(input) {
    // Проверяем, что значение input не пустое
    // Получаем атрибуты input
    const inputAttributes = [...input.attributes];

    // Создаем элемент option
    let option = document.createElement('option');

    // Получаем текстовое содержимое метки для этой опции
    let textContent = input.parentElement.querySelector('.select-content__radio').textContent.trim();

    // Устанавливаем атрибуты элемента option на основе атрибутов input
    inputAttributes.forEach(attribute => {
      let name = attribute.name;

      // Исключаем атрибуты 'type' и 'name'
      if (name !== 'type' && name !== 'name' && name !== 'checked') {
        option.setAttribute(name, attribute.value);
      }
      if (name === 'checked') {
        option.setAttribute('selected', 'selected');
        option.selected = true;
      }
    });
    let optionClasses = Array.from(input.classList);
    optionClasses.forEach(className => option.classList.add(className));

    // Устанавливаем текстовое содержимое опции
    option.textContent = textContent;
    return option;
  }
}
document.addEventListener('DOMContentLoaded', function () {
  // Получаем основной элемент body
  const mainBody = document.querySelector('body');
  // Получаем высоту заголовка
  const header = document.getElementById('header_id');
  // Получаем высоту подвала
  const footer = document.querySelector('footer');
  // Получаем основной элемент main
  const main = document.querySelector('main');
  const desktop = 1201;
  const laptop = 1200.98;
  const tablet = 1029.98;
  const mobile = 807.98;
  const fullMobile = 575.98;
  const clientWidth = document.documentElement.clientWidth;
  const contentWrapWidth = calculateDynamicValue({
    desktop: 1160,
    laptop: 990,
    tablet: 740,
    mobile: clientWidth - 20
  });

  /**
   * Рассчитывает динамическое значение в зависимости от переданных параметров и ширины окна браузера.
   * @param {Object} values - Объект с значениями для разных ширин экрана.
   * @param {number} values.desktop - Значение для ширины экрана больше 1201 пикселя.
   * @param {number} values.laptop - Значение для ширины экрана между 1200 и 1029 пикселями.
   * @param {number} values.tablet - Значение для ширины экрана между 1029 и 807 пикселями.
   * @param {number} values.mobile - Значение для ширины экрана менее 807 пикселей.
   * @returns {*} - Рассчитанное динамическое значение.
   */

  function calculateDynamicValue(values) {
    let value;
    if (clientWidth > desktop) {
      value = values['desktop'];
    } else if (clientWidth >= tablet && clientWidth < laptop) {
      value = values['laptop'];
    } else if (clientWidth >= mobile && clientWidth < tablet) {
      value = values['tablet'];
    } else if (clientWidth < mobile) {
      value = values['mobile'];
    }
    return value;
  }

  // Растягиваем основной элемент main между заголовком и подвалом
  const headerHeight = header.offsetHeight; // Получаем высоту заголовка
  const footerHeight = footer.offsetHeight; // Получаем высоту подвала
  main.style.minHeight = `calc(100vh - (${headerHeight}px + ${footerHeight}px))`; // Устанавливаем минимальную высоту основного элемента main

  // плавная прокуртка
  // Функция для плавной прокрутки к якорю
  function smoothScroll(e) {
    e.preventDefault(); // Отменяем стандартное поведение ссылки
    // Получаем ID якоря из атрибута data-href или href
    const targetId = this.getAttribute('data-href') || this.getAttribute('href');
    // Находим элемент с нужным ID
    const targetElement = document.querySelector(targetId);
    const duration = 1000; // Длительность анимации прокрутки (в миллисекундах)
    if (targetElement) {
      // Проверяем, найден ли элемент с нужным ID
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

  // Найти элемент с классом 'header__hamburger'
  const hamburger = header.querySelector('.header__hamburger');
  const hamburgerClose = header.querySelector('.header__close');
  const hamburgerWrap = header.querySelector('.header__nav');

  // if (hamburger)
  const closeHamburger = () => {
    if (!hamburger) {
      console.error('Элемент hamburger отсутствует!');
      return;
    }
    hamburger.classList.remove('open');
    hamburgerWrap.classList.remove('slideInRight');
    hamburgerWrap.classList.add('slideOutRight');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
      hamburgerWrap.classList.add('menu-hidden');
    }, 1000);
  };
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
    hamburgerClose.addEventListener('click', event => {
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
  const customSelects = document.querySelectorAll('.custom-select');
  if (customSelects.length > 0) {
    customSelects.forEach(select => {
      new CustomSelect('init', {
        selectElement: select,
        show: 5
      });
    });
  }
  const rangeInput = document.getElementById('rangeInput');
  const rangeValue = document.getElementById('rangeValue');
  if (rangeInput && rangeValue) {
    rangeInput.addEventListener('input', function () {
      rangeValue.textContent = this.value + '%';
    });
  }
  const fileInput = document.getElementById('custom_file');
  if (fileInput) {
    const icons = {
      pdf: '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.756 0H40.076L58.013 17.94V52.391C58.013 56.575 54.591 60 50.403 60H19.757C15.573 60 12.151 56.575 12.151 52.391V7.61C12.15 3.426 15.572 0 19.756 0Z" fill="#E5252A" />\n' + '  <path fill-rule="evenodd" clip-rule="evenodd" d="M40.0761 0L58.0131 17.94H42.0101C41.497 17.9387 41.0054 17.7341 40.6429 17.371C40.2804 17.008 40.0766 16.516 40.0761 16.003V0ZM3.65706 25.55H44.9801C45.8991 25.55 46.6501 26.3 46.6501 27.22V42.379C46.6501 43.298 45.8991 44.049 44.9801 44.049H3.65706C2.73806 44.049 1.98706 43.297 1.98706 42.379V27.219C1.98706 26.3 2.73806 25.55 3.65706 25.55Z" fill="#B71D21" />\n' + '  <path d="M13.8 28.64H10.683C10.5557 28.6401 10.4297 28.6653 10.3122 28.7142C10.1947 28.763 10.088 28.8345 9.99807 28.9245C9.90819 29.0146 9.83692 29.1215 9.78834 29.2391C9.73977 29.3567 9.71483 29.4828 9.71497 29.61V39.985C9.71497 40.2419 9.817 40.4882 9.99863 40.6698C10.1803 40.8515 10.4266 40.9535 10.6835 40.9535C10.9403 40.9535 11.1867 40.8515 11.3683 40.6698C11.5499 40.4882 11.652 40.2419 11.652 39.985V36.945H13.8C14.8831 36.944 15.9217 36.5133 16.6877 35.7474C17.4537 34.9816 17.8846 33.9432 17.886 32.86V32.726C17.8846 31.643 17.4538 30.6047 16.688 29.8389C15.9222 29.0731 14.884 28.6423 13.801 28.641L13.8 28.64ZM15.949 32.86C15.9484 33.4297 15.7218 33.9759 15.3189 34.3787C14.916 34.7814 14.3697 35.0077 13.8 35.008H11.652V30.578H13.8C14.3697 30.5783 14.916 30.8046 15.3189 31.2074C15.7218 31.6101 15.9484 32.1563 15.949 32.726V32.86ZM24.224 28.64H21.108C20.8509 28.6403 20.6044 28.7426 20.4227 28.9245C20.241 29.1064 20.139 29.3529 20.139 29.61V39.985C20.139 40.242 20.2411 40.4885 20.4228 40.6702C20.6045 40.8519 20.851 40.954 21.108 40.954H24.224C25.3073 40.953 26.346 40.5221 27.112 39.7561C27.8781 38.99 28.3089 37.9514 28.31 36.868V32.726C28.3086 31.643 27.8778 30.6047 27.112 29.8389C26.3462 29.0731 25.308 28.6423 24.225 28.641L24.224 28.64ZM26.373 36.868C26.3724 37.4377 26.1458 37.9839 25.7429 38.3867C25.34 38.7894 24.7937 39.0157 24.224 39.016H22.076V30.578H24.224C24.7937 30.5783 25.34 30.8046 25.7429 31.2074C26.1458 31.6101 26.3724 32.1563 26.373 32.726V36.868ZM32.689 30.578V33.259H37.179C37.4283 33.2703 37.6638 33.3774 37.8362 33.5579C38.0087 33.7384 38.1049 33.9784 38.1049 34.228C38.1049 34.4777 38.0087 34.7177 37.8362 34.8982C37.6638 35.0786 37.4283 35.1857 37.179 35.197H32.689V39.985C32.689 40.242 32.5869 40.4885 32.4052 40.6702C32.2234 40.8519 31.977 40.954 31.72 40.954C31.463 40.954 31.2165 40.8519 31.0348 40.6702C30.8531 40.4885 30.751 40.242 30.751 39.985V29.61C30.7512 29.3529 30.8535 29.1065 31.0354 28.9248C31.2173 28.7431 31.4639 28.641 31.721 28.641H37.954C38.211 28.641 38.4574 28.7431 38.6392 28.9248C38.8209 29.1066 38.923 29.353 38.923 29.61C38.923 29.867 38.8209 30.1135 38.6392 30.2952C38.4574 30.4769 38.211 30.579 37.954 30.579H32.689V30.578Z" fill="white" />\n' + '</svg>',
      word: '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.756 0H40.076L58.013 17.94V52.391C58.013 56.575 54.591 60 50.403 60H19.757C15.573 60 12.151 56.575 12.151 52.391V7.61C12.15 3.426 15.572 0 19.756 0Z" fill="#0263D1" />\n' + '  <path fill-rule="evenodd" clip-rule="evenodd" d="M40.0761 0L58.0131 17.94H42.0101C41.497 17.9387 41.0054 17.7341 40.6429 17.371C40.2804 17.008 40.0766 16.516 40.0761 16.003V0ZM3.65706 25.55H44.9801C45.8991 25.55 46.6501 26.3 46.6501 27.22V42.379C46.6501 43.298 45.8991 44.049 44.9801 44.049H3.65706C2.73806 44.049 1.98706 43.297 1.98706 42.379V27.219C1.98706 26.3 2.73806 25.55 3.65706 25.55Z" fill="#0353AD" />\n' + '  <path d="M10 40.8662V29.1338H13.3586C14.0303 29.1338 14.6558 29.258 15.2349 29.4873C15.8139 29.7261 16.3389 30.0701 16.81 30.5287C17.2809 30.9873 17.6516 31.5988 17.9218 32.3631C18.192 33.1274 18.331 34.0064 18.331 35C18.331 35.9936 18.192 36.8726 17.9218 37.6369C17.6516 38.4012 17.2809 39.0127 16.81 39.4713C16.339 39.9298 15.8139 40.2738 15.2349 40.5127C14.6558 40.742 14.0304 40.8662 13.3586 40.8662H10ZM12.3703 38.3153H13.0729C13.4513 38.3153 13.8064 38.258 14.123 38.1529C14.4472 38.0382 14.7406 37.8567 15.0186 37.6178C15.2965 37.3789 15.5127 37.035 15.6671 36.586C15.8293 36.1465 15.9064 35.6114 15.9064 35C15.9064 34.3886 15.8292 33.8535 15.6671 33.4045C15.5127 32.965 15.2965 32.621 15.0186 32.3822C14.7406 32.1338 14.4472 31.9619 14.123 31.8471C13.8064 31.742 13.4513 31.6847 13.0729 31.6847H12.3703V38.3153ZM24.0831 41C22.6547 41 21.4734 40.4267 20.5392 39.2898C19.6049 38.1529 19.1417 36.7197 19.1417 35.0001C19.1417 33.2803 19.6049 31.8472 20.5392 30.7103C21.4734 29.5734 22.6547 29.0002 24.0831 29.0002C25.4883 29.0002 26.6541 29.5735 27.5884 30.7103C28.5149 31.8473 28.9782 33.2804 28.9782 35.0001C28.9782 36.7197 28.5149 38.1529 27.5884 39.2898C26.6541 40.4267 25.4883 41 24.0831 41ZM22.2609 37.4745C22.7319 38.1242 23.3341 38.4491 24.0676 38.4491C24.8011 38.4491 25.3956 38.1242 25.8666 37.4745C26.3375 36.8153 26.5692 35.9936 26.5692 35C26.5692 34.0064 26.3375 33.1847 25.8666 32.5255C25.3956 31.8758 24.8011 31.5509 24.0676 31.5509C23.3341 31.5509 22.7319 31.8758 22.2609 32.5255C21.7899 33.1847 21.5506 34.0064 21.5506 35C21.5506 35.9936 21.7899 36.8153 22.2609 37.4745ZM34.6144 41C33.2324 41 32.0819 40.465 31.1709 39.414C30.2521 38.3535 29.7966 36.8822 29.7966 35C29.7966 33.1274 30.2599 31.656 31.1864 30.5955C32.1206 29.535 33.2556 29 34.6145 29C35.8421 29 36.8458 29.3726 37.6411 30.1274C38.4287 30.8726 38.8842 31.8662 39 33.1082L36.6065 33.7102C36.5061 33.0605 36.2668 32.535 35.8962 32.1433C35.5256 31.7515 35.0932 31.5509 34.599 31.5509C33.9196 31.5509 33.3559 31.8471 32.9004 32.449C32.4448 33.0604 32.2132 33.9012 32.2132 34.9999C32.2132 36.0987 32.4448 36.9394 32.8926 37.5413C33.3482 38.1528 33.9118 38.449 34.5989 38.449C35.0931 38.449 35.5178 38.2771 35.8652 37.9331C36.2126 37.5892 36.4288 37.1306 36.5215 36.5573L38.969 37.2452C38.7451 38.4299 38.2509 39.3471 37.4789 40.0063C36.7145 40.6656 35.7572 41 34.6144 41Z" fill="white" />\n' + '</svg>'
    };
    const fileParent = fileInput.closest('._file');
    const uploadContainer = fileParent.querySelector('.file-upload');
    const outputContainer = fileParent.querySelector('.file-output');
    const iconContainer = outputContainer.querySelector('.file-output__icon');
    const createRemoveButton = () => {
      const removeButton = document.createElement('span');
      removeButton.classList.add('file-output__remove');
      removeButton.addEventListener('click', () => {
        uploadContainer.style.display = 'block';
        outputContainer.style.display = 'none';
        fileInput.value = '';
      });
      outputContainer.append(removeButton);
    };
    fileInput.addEventListener('change', e => {
      const file = e.target.files[0];

      // Получаем расширение файла
      const fileExtension = file.name.split('.').pop().toLowerCase();

      // Проверяем тип файла
      if (file.type === 'application/pdf' || fileExtension === 'pdf') {
        console.log('Это PDF файл');
        // Вставляем иконку PDF
        iconContainer.innerHTML = icons.pdf;
        uploadContainer.style.display = 'none';
        outputContainer.style.display = 'block';
        createRemoveButton();
      } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || ['doc', 'docx'].includes(fileExtension)) {
        console.log('Это Word документ');
        // Вставляем иконку Word
        iconContainer.innerHTML = icons.word;
        uploadContainer.style.display = 'none';
        outputContainer.style.display = 'block';
        createRemoveButton();
      } else {
        console.log('Неподдерживаемый формат файла');
        // Можно показать сообщение об ошибке или сбросить поле
        e.target.value = '';
        uploadContainer.style.display = 'block';
        outputContainer.style.display = 'none';
      }
    });
  }
  const checkoutForm = document.getElementById('checkout_form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', e => {
      e.preventDefault();
      const errors = [];
      const form = e.target;
      const formData = new FormData(form);

      // Валидация select
      const systemType = formData.get('system_type');
      if (!systemType) {
        errors.push('Поле тип системы обязательно для заполнения');
      }

      // Валидация имени
      const name = formData.get('name') ? formData.get('name').trim() : '';
      if (name.length < 3) {
        errors.push('Поле имя должно содержать не менее 3 символов');
      }

      // Валидация email
      const email = formData.get('email').trim() ? formData.get('email') : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        errors.push('Поле email обязательно для заполнения');
      } else if (!emailRegex.test(email)) {
        errors.push('Поле email должно содержать корректный email-адрес');
      }

      // Валидация range
      const range = formData.get('range');
      if (!range) {
        errors.push('Поле диапазон обязательно для заполнения');
      }

      // Валидация file
      const file = formData.get('document');
      if (!file) {
        errors.push('Поле документ обязательно для заполнения');
      }
      if (errors.length > 0) {
        Swal.fire({
          title: 'Ошибка при отправке формы:',
          html: errors.join('<br>'),
          icon: 'warning'
        });
        return;
      }
      const url = 'https://jsonplaceholder.typicode.com/posts';
      const requestOptions = {
        method: 'POST',
        body: formData
      };
      document.body.classList.add('loading');
      fetch(url, requestOptions).then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        return response.json();
      }).then(data => {
        if (data.id === 101) {
          Swal.fire({
            title: 'Форма успешно отправлена',
            icon: 'success'
          });
          form.reset();
          const formInputFileWrapper = form.querySelector('._file');
          if (formInputFileWrapper) {
            formInputFileWrapper.querySelector('.file-upload').style.display = 'block';
            formInputFileWrapper.querySelector('.file-output').style.display = 'none';
          }
        } else {
          Swal.fire({
            title: 'Произошла ошибка при отправке формы',
            icon: 'error'
          });
        }
      }).catch(error => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Произошла ошибка при отправке формы',
          icon: 'error'
        });
      }).finally(() => {
        document.body.classList.remove('loading');
      });
    });
  }
});