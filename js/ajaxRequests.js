'use strict';

(function (){

    /**
     * Отправка формы через ajax
     * @param {HTMLFormElement} form
     * @param {function} success
     * @param {function} error
     */
    window.ajaxSubmit = function (form, success, error) {
        var url = form.action,
            xhr = new XMLHttpRequest();

        var formData = new FormData(form);

        xhr.addEventListener('load', function () {

            switch (xhr.status) {
                case 200:
                    success(xhr);
                    break;

                default:
                    console.log(xhr.status);
                    error(xhr);
            }
        });

        xhr.open("POST", url);

        xhr.send(formData);
    }

    /**
     * Получение json данных по ссылке
     * @param {string} link - ссыла на данные
     * @param {function} success
     * @param {function} error
     */
    window.ajaxGetJSON = function (link, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            switch (xhr.status) {
                case 200:
                    success(xhr);

                    break;

                default:
                    console.log(xhr.status);
                    error(xhr);
            }
        });

        xhr.open('GET', link);
        xhr.send();
    }
})();