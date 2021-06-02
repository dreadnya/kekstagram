'use strict';

(function (){
    var photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

    window.picture = {

        /**
         *
         * @param {Object} photoData - Объект с даннымим изображения
         * @returns {Node}
         */
        createPhotoElement(photoData) {
            var photoElement = photoTemplate.cloneNode(true);

            photoElement.querySelector('img').src = photoData.url;
            photoElement.querySelector('.picture__likes').textContent = photoData.likes;
            photoElement.querySelector('.picture__comments').textContent = photoData.comments.length;

            photoElement.addEventListener('click', function (evt){
                evt.preventDefault();

                window.bigPicture.popupBigPicture.beforeOpen = window.bigPicture.createBigPicture(photoData);
                window.bigPicture.popupBigPicture.openPopup();
            });

            return photoElement;
        }
    }

})();