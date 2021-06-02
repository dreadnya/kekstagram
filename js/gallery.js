'use strict';

(function (){
    var photosContainer = document.querySelector('.pictures');

    window.gallery = {
        photosDataDefault: [],
        photosDataCurrent: [],

        /**
         * Отрисовка галлереи фото
         *
         * @param {Array} photosArray - Массив объектов с даннымим о фото
         */
        renderGallery (photosArray){
            var fragment = document.createDocumentFragment();
            var oldPictures = document.querySelectorAll('.picture');

            //Удаление старых фото
            if (oldPictures) {
                [].forEach.call(oldPictures, function (el) {
                    el.remove();
                });
            }

            photosArray.forEach(function (element) {
                return fragment.appendChild(window.picture.createPhotoElement(element));
            });

            photosContainer.appendChild(fragment);

        }
    }

})();