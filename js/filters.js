(function (){
    var filtersButtons = document.querySelectorAll('.img-filters__button'),
        activeFilter = document.querySelector('.img-filters__button--active');


    var generateFilteredArray = {
        /**
         * Фильтр выдающий дефолтные данные
         *
         * @param {Array} photos - Массив с данными фотографий для сортировки
         * @returns {Array} - отсортированный массив
         */
        "filter-default": function (photos) {
            return photos;
        },

        /**
         * Фильтр выдающий фото в рандомном порядке
         *
         * @param {Array} photos - Массив с данными фотографий для сортировки
         * @returns {Array} - отсортированный массив
         */
        "filter-random": function (photos) {
            var randomPhotos = [];
            var defaultArray = photos.slice();

            for (var i = 0; i < 10; i++) {
                var randomInt = window.utils.getRandomInt(0, defaultArray.length);

                randomPhotos.push(defaultArray[randomInt]);
                defaultArray.splice(randomInt, 1);
            }

            return randomPhotos;
        },

        /**
         * Фильтр выдающий данные в порядке обсуждаемости (наибольшее колличество комментов)
         *
         * @param {Array} photos - Массив с данными фотографий для сортировки
         * @returns {Array} - отсортированный массив
         */
        "filter-discussed": function (photos) {
            var sortedArray = photos.slice();

            return sortedArray.sort(function (first, second) {
                if (first.comments.length > second.comments.length) {
                    return -1;
                } else if (first.comments.length < second.comments.length) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
    };

    /**
     * Применение фильтра галлереи с дебаунсом
     * @type {function(): void}
     */
    var onFiltersApply = window.debounce(function (filteredArray) {
        window.gallery.renderGallery(filteredArray);
        window.gallery.photosDataCurrent = filteredArray;
    });

    /**
     * Обработчик нажатия кнопок фильтров
     */
    [].forEach.call(filtersButtons, function (btn) {
        btn.addEventListener('click', function (evt){
            var clickedBtn = evt.target,
                filterType = clickedBtn.id;

            //Активация кнопки
            activeFilter.classList.remove('img-filters__button--active');
            clickedBtn.classList.add('img-filters__button--active');
            activeFilter = clickedBtn;

            //Применение фильтра
            var filteredArray = generateFilteredArray[filterType](window.gallery.photosDataDefault);
            onFiltersApply(filteredArray);
        })
    });


})();