'use strict';

(function (){

    window.ajaxGetJSON('http://localhost:63342/kekstagram/data.json', function (xhr) {
        window.gallery.photosDataDefault = xhr.response;
        window.gallery.photosDataCurrent = xhr.response;

        window.gallery.renderGallery(xhr.response);

        //Отобразить фильтры
        document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    }, function (xhr) {
        alert(xhr.status);
    });

})();