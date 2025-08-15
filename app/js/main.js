@@include('_custom_select.js')


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
            value = values['mobile']
        }

        return value;
    }

// Растягиваем основной элемент main между заголовком и подвалом
    const headerHeight = header.offsetHeight; // Получаем высоту заголовка
    const footerHeight = footer.offsetHeight; // Получаем высоту подвала
    main.style.minHeight = `calc(100vh - (${headerHeight}px + ${footerHeight}px))`; // Устанавливаем минимальную высоту основного элемента main

    // плавная прокуртка
    @@include('_smooth_scroll.js')

    @@include('_header.js')
    @@include('_hamburger.js')

    const customSelects = document.querySelectorAll('.custom-select');

    if (customSelects.length > 0) {
        customSelects.forEach(select => {
            new CustomSelect('init', {
                selectElement: select,
                show: 5
            })
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
            pdf: '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.756 0H40.076L58.013 17.94V52.391C58.013 56.575 54.591 60 50.403 60H19.757C15.573 60 12.151 56.575 12.151 52.391V7.61C12.15 3.426 15.572 0 19.756 0Z" fill="#E5252A" />\n' +
                '  <path fill-rule="evenodd" clip-rule="evenodd" d="M40.0761 0L58.0131 17.94H42.0101C41.497 17.9387 41.0054 17.7341 40.6429 17.371C40.2804 17.008 40.0766 16.516 40.0761 16.003V0ZM3.65706 25.55H44.9801C45.8991 25.55 46.6501 26.3 46.6501 27.22V42.379C46.6501 43.298 45.8991 44.049 44.9801 44.049H3.65706C2.73806 44.049 1.98706 43.297 1.98706 42.379V27.219C1.98706 26.3 2.73806 25.55 3.65706 25.55Z" fill="#B71D21" />\n' +
                '  <path d="M13.8 28.64H10.683C10.5557 28.6401 10.4297 28.6653 10.3122 28.7142C10.1947 28.763 10.088 28.8345 9.99807 28.9245C9.90819 29.0146 9.83692 29.1215 9.78834 29.2391C9.73977 29.3567 9.71483 29.4828 9.71497 29.61V39.985C9.71497 40.2419 9.817 40.4882 9.99863 40.6698C10.1803 40.8515 10.4266 40.9535 10.6835 40.9535C10.9403 40.9535 11.1867 40.8515 11.3683 40.6698C11.5499 40.4882 11.652 40.2419 11.652 39.985V36.945H13.8C14.8831 36.944 15.9217 36.5133 16.6877 35.7474C17.4537 34.9816 17.8846 33.9432 17.886 32.86V32.726C17.8846 31.643 17.4538 30.6047 16.688 29.8389C15.9222 29.0731 14.884 28.6423 13.801 28.641L13.8 28.64ZM15.949 32.86C15.9484 33.4297 15.7218 33.9759 15.3189 34.3787C14.916 34.7814 14.3697 35.0077 13.8 35.008H11.652V30.578H13.8C14.3697 30.5783 14.916 30.8046 15.3189 31.2074C15.7218 31.6101 15.9484 32.1563 15.949 32.726V32.86ZM24.224 28.64H21.108C20.8509 28.6403 20.6044 28.7426 20.4227 28.9245C20.241 29.1064 20.139 29.3529 20.139 29.61V39.985C20.139 40.242 20.2411 40.4885 20.4228 40.6702C20.6045 40.8519 20.851 40.954 21.108 40.954H24.224C25.3073 40.953 26.346 40.5221 27.112 39.7561C27.8781 38.99 28.3089 37.9514 28.31 36.868V32.726C28.3086 31.643 27.8778 30.6047 27.112 29.8389C26.3462 29.0731 25.308 28.6423 24.225 28.641L24.224 28.64ZM26.373 36.868C26.3724 37.4377 26.1458 37.9839 25.7429 38.3867C25.34 38.7894 24.7937 39.0157 24.224 39.016H22.076V30.578H24.224C24.7937 30.5783 25.34 30.8046 25.7429 31.2074C26.1458 31.6101 26.3724 32.1563 26.373 32.726V36.868ZM32.689 30.578V33.259H37.179C37.4283 33.2703 37.6638 33.3774 37.8362 33.5579C38.0087 33.7384 38.1049 33.9784 38.1049 34.228C38.1049 34.4777 38.0087 34.7177 37.8362 34.8982C37.6638 35.0786 37.4283 35.1857 37.179 35.197H32.689V39.985C32.689 40.242 32.5869 40.4885 32.4052 40.6702C32.2234 40.8519 31.977 40.954 31.72 40.954C31.463 40.954 31.2165 40.8519 31.0348 40.6702C30.8531 40.4885 30.751 40.242 30.751 39.985V29.61C30.7512 29.3529 30.8535 29.1065 31.0354 28.9248C31.2173 28.7431 31.4639 28.641 31.721 28.641H37.954C38.211 28.641 38.4574 28.7431 38.6392 28.9248C38.8209 29.1066 38.923 29.353 38.923 29.61C38.923 29.867 38.8209 30.1135 38.6392 30.2952C38.4574 30.4769 38.211 30.579 37.954 30.579H32.689V30.578Z" fill="white" />\n' +
                '</svg>',
            word: '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.756 0H40.076L58.013 17.94V52.391C58.013 56.575 54.591 60 50.403 60H19.757C15.573 60 12.151 56.575 12.151 52.391V7.61C12.15 3.426 15.572 0 19.756 0Z" fill="#0263D1" />\n' +
                '  <path fill-rule="evenodd" clip-rule="evenodd" d="M40.0761 0L58.0131 17.94H42.0101C41.497 17.9387 41.0054 17.7341 40.6429 17.371C40.2804 17.008 40.0766 16.516 40.0761 16.003V0ZM3.65706 25.55H44.9801C45.8991 25.55 46.6501 26.3 46.6501 27.22V42.379C46.6501 43.298 45.8991 44.049 44.9801 44.049H3.65706C2.73806 44.049 1.98706 43.297 1.98706 42.379V27.219C1.98706 26.3 2.73806 25.55 3.65706 25.55Z" fill="#0353AD" />\n' +
                '  <path d="M10 40.8662V29.1338H13.3586C14.0303 29.1338 14.6558 29.258 15.2349 29.4873C15.8139 29.7261 16.3389 30.0701 16.81 30.5287C17.2809 30.9873 17.6516 31.5988 17.9218 32.3631C18.192 33.1274 18.331 34.0064 18.331 35C18.331 35.9936 18.192 36.8726 17.9218 37.6369C17.6516 38.4012 17.2809 39.0127 16.81 39.4713C16.339 39.9298 15.8139 40.2738 15.2349 40.5127C14.6558 40.742 14.0304 40.8662 13.3586 40.8662H10ZM12.3703 38.3153H13.0729C13.4513 38.3153 13.8064 38.258 14.123 38.1529C14.4472 38.0382 14.7406 37.8567 15.0186 37.6178C15.2965 37.3789 15.5127 37.035 15.6671 36.586C15.8293 36.1465 15.9064 35.6114 15.9064 35C15.9064 34.3886 15.8292 33.8535 15.6671 33.4045C15.5127 32.965 15.2965 32.621 15.0186 32.3822C14.7406 32.1338 14.4472 31.9619 14.123 31.8471C13.8064 31.742 13.4513 31.6847 13.0729 31.6847H12.3703V38.3153ZM24.0831 41C22.6547 41 21.4734 40.4267 20.5392 39.2898C19.6049 38.1529 19.1417 36.7197 19.1417 35.0001C19.1417 33.2803 19.6049 31.8472 20.5392 30.7103C21.4734 29.5734 22.6547 29.0002 24.0831 29.0002C25.4883 29.0002 26.6541 29.5735 27.5884 30.7103C28.5149 31.8473 28.9782 33.2804 28.9782 35.0001C28.9782 36.7197 28.5149 38.1529 27.5884 39.2898C26.6541 40.4267 25.4883 41 24.0831 41ZM22.2609 37.4745C22.7319 38.1242 23.3341 38.4491 24.0676 38.4491C24.8011 38.4491 25.3956 38.1242 25.8666 37.4745C26.3375 36.8153 26.5692 35.9936 26.5692 35C26.5692 34.0064 26.3375 33.1847 25.8666 32.5255C25.3956 31.8758 24.8011 31.5509 24.0676 31.5509C23.3341 31.5509 22.7319 31.8758 22.2609 32.5255C21.7899 33.1847 21.5506 34.0064 21.5506 35C21.5506 35.9936 21.7899 36.8153 22.2609 37.4745ZM34.6144 41C33.2324 41 32.0819 40.465 31.1709 39.414C30.2521 38.3535 29.7966 36.8822 29.7966 35C29.7966 33.1274 30.2599 31.656 31.1864 30.5955C32.1206 29.535 33.2556 29 34.6145 29C35.8421 29 36.8458 29.3726 37.6411 30.1274C38.4287 30.8726 38.8842 31.8662 39 33.1082L36.6065 33.7102C36.5061 33.0605 36.2668 32.535 35.8962 32.1433C35.5256 31.7515 35.0932 31.5509 34.599 31.5509C33.9196 31.5509 33.3559 31.8471 32.9004 32.449C32.4448 33.0604 32.2132 33.9012 32.2132 34.9999C32.2132 36.0987 32.4448 36.9394 32.8926 37.5413C33.3482 38.1528 33.9118 38.449 34.5989 38.449C35.0931 38.449 35.5178 38.2771 35.8652 37.9331C36.2126 37.5892 36.4288 37.1306 36.5215 36.5573L38.969 37.2452C38.7451 38.4299 38.2509 39.3471 37.4789 40.0063C36.7145 40.6656 35.7572 41 34.6144 41Z" fill="white" />\n' +
                '</svg>'
        }

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
        }

        fileInput.addEventListener('change', (e) => {
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
            } else if (
                file.type === 'application/msword' ||
                file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                ['doc', 'docx'].includes(fileExtension)
            ) {
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

        checkoutForm.addEventListener('submit', (e) => {
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
                    icon: 'warning',
                });
                return;
            }

            const url = 'https://jsonplaceholder.typicode.com/posts';

            const requestOptions = {
                method: 'POST',
                body: formData
            };

            document.body.classList.add('loading');
            fetch(url, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка сети');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.id === 101) {
                        Swal.fire({
                            title: 'Форма успешно отправлена',
                            icon: 'success',
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
                            icon: 'error',
                        });
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        title: 'Произошла ошибка при отправке формы',
                        icon: 'error',
                    });
                })
                .finally(() => {
                    document.body.classList.remove('loading');
                });
        });
    }
});
