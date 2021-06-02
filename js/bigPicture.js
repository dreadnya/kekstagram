'use strict';

(function (){
    var bigPicturePopup = document.querySelector('.big-picture');
    var bigPictureImg = document.querySelector('.big-picture__img img');
    var bigPictureLikesCount = document.querySelector('.likes-count');
    var bigPictureCaption = document.querySelector('.social__caption');
    var bigPictureCommentsCount = document.querySelector('.comments-count');
    var bigPictureCommentsContainer = document.querySelector('.social__comments');
    var bigPictureCommentsTemplate = document.querySelector('.social__comment');
    var bigPictureCommentsSocialCount = document.querySelector('.social__comment-count');
    var bigPictureCommentsLoader = document.querySelector('.comments-loader');

    var popupBigPictureElement = new window.Popup(bigPicturePopup);
    var comments = [];


    /**
     * Создание DOM элемента коммента
     * @param {Object} commentData
     * @returns {Node}
     */
    var createComment = function (commentData) {
        var commentElement = bigPictureCommentsTemplate.cloneNode(true);

        commentElement.querySelector('.social__picture').src = commentData.avatar;
        commentElement.querySelector('.social__text').textContent = commentData.message;

        return commentElement;
    }

    /**
     * Показ следующих 5-ти комментов
     *
     * @returns {DocumentFragment}
     */
    var showMoreComments = function () {
        var commentsFragment = document.createDocumentFragment();

        if (comments.length <= 5) {
            bigPictureCommentsLoader.classList.add('visually-hidden');
        }

        for (var i = 0; (i < 5) && comments[0]; i++) {
            commentsFragment.appendChild(createComment(comments[0]));
            comments.shift();
        }

        return commentsFragment;
    }

    /**
     * Обработчик клика на кнопку с показаом доп комментов
     */
    bigPictureCommentsLoader.addEventListener('click', function (){
        var fragment = showMoreComments();

        bigPictureCommentsContainer.appendChild(fragment);
    });

    window.bigPicture = {

        popupBigPicture: popupBigPictureElement,

        /**
         * Функция заполнения попапа с фото
         *
         * @param {Object} photoData
         */
        createBigPicture(photoData) {
            var fragment = document.createDocumentFragment();

            bigPictureImg.src = photoData.url;
            bigPictureLikesCount.textContent = photoData.likes;
            bigPictureCaption.textContent = photoData.description;
            bigPictureCommentsCount.textContent = photoData.comments.length;
            bigPictureCommentsContainer.innerHTML = '';

            comments = photoData.comments.slice();
            bigPictureCommentsLoader.classList.remove('visually-hidden');

            fragment = showMoreComments();

            bigPictureCommentsContainer.appendChild(fragment);

            bigPictureCommentsSocialCount.classList.add('visually-hidden');

        }
    }

})();