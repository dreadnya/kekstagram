'use strict';

(function (){
    var currentEffectName,
        inputPhotoUpload = document.querySelector('#upload-file'),
        popupPhotoUpload = document.querySelector('.img-upload__overlay'),
        scaleValue = document.querySelector('.scale__control--value'),
        scaleControlSmaller = document.querySelector('.scale__control--smaller'),
        scaleControlBigger = document.querySelector('.scale__control--bigger'),
        imageUploadPreview = document.querySelector('.img-upload__preview'),
        effectButtons = document.querySelectorAll('.effects__radio'),
        imageUploadEffectRange = document.querySelector('.img-upload__effect-level'),
        effectPin = document.querySelector('.effect-level__pin'),
        effectDepth = document.querySelector('.effect-level__depth'),
        effectValue = document.querySelector('.effect-level__value'),
        effectLine = document.querySelector('.effect-level__line'),
        descriptionInput = document.querySelector('.text__description'),
        hashtagsInput = document.querySelector('.text__hashtags'),
        uploadPhotoForm = document.getElementById('upload-select-image');

    /**
     * Сброисть все данные из формы
     */
    var resetPhotoPopupData = function () {
        scaleValue.value = "100%";
        inputPhotoUpload.value = '';
        descriptionInput.value = '';
        hashtagsInput.value = '';
        imageUploadPreview.style = '';
        imageUploadPreview.className = "img-upload__preview";
        imageUploadEffectRange.classList.add('hidden');
    }

    /**
     * Инициализация попапа формы
     * @type {Window.Popup}
     */
    var formPopup = new window.Popup(popupPhotoUpload);
    formPopup.afterClose = function (){
        resetPhotoPopupData();
    }
    inputPhotoUpload.addEventListener('change', function () {
        formPopup.openPopup();
    });


    /**
     * установаить масштаб изображения
     *
     * @param changerValue
     */
    var setPhotoScale = function (changerValue) {
        var currentScaleValue = scaleValue.value;
        currentScaleValue = currentScaleValue.replace('%', '');

        currentScaleValue = +currentScaleValue + changerValue;


        if(currentScaleValue < 25) {
            currentScaleValue = 25;
        }
        if(currentScaleValue > 100) {
            currentScaleValue = 100;
        }


        scaleValue.value = currentScaleValue + '%';

        currentScaleValue = currentScaleValue/100;
        imageUploadPreview.style.transform = 'scale(' + currentScaleValue + ')';
    }

    /**
     * нажатие на кнопку уменьшения масштаба
     */
    scaleControlSmaller.addEventListener('click', function (){
        setPhotoScale(-25);
    });

    /**
     * нажатие на кнопку увеличения масштаба
     */
    scaleControlBigger.addEventListener('click', function (){
        setPhotoScale(25);
    });


    /**
     * Коллекция фильтров
     *
     * @type {{heat: effects.heat, marvin: effects.marvin, sepia: effects.sepia, phobos: effects.phobos, chrome: effects.chrome, none: effects.none}}
     */
    var effects = {

        "chrome": function (effectValue) {
            effectValue = effectValue/100;
            imageUploadPreview.style.filter = 'grayscale(' + effectValue + ')';
            imageUploadEffectRange.classList.remove('hidden');
        },

        "sepia": function (effectValue) {
            effectValue = effectValue/100;
            imageUploadPreview.style.filter = 'sepia(' + effectValue + ')';
            imageUploadEffectRange.classList.remove('hidden');
        },

        "marvin": function (effectValue) {
            imageUploadPreview.style.filter = 'invert(' + effectValue + '%)';
            imageUploadEffectRange.classList.remove('hidden');
        },

        "phobos": function (effectValue) {
            effectValue = 0.03 * effectValue;
            imageUploadPreview.style.filter = 'blur(' + effectValue + 'px)';
            imageUploadEffectRange.classList.remove('hidden');
        },

        "heat": function (effectValue) {
            effectValue = 0.02 * effectValue + 1;
            imageUploadPreview.style.filter = 'brightness(' + effectValue + ')';
            imageUploadEffectRange.classList.remove('hidden');
        },

        "none": function (effectValue) {
            imageUploadPreview.style.filter = 'none';
            imageUploadEffectRange.classList.add('hidden');
        }


    };


    /**
     * выбор эффекта превью
     */
    effectButtons.forEach(function (effectButton){
        effectButton.addEventListener('change', function () {
            currentEffectName = this.value;

            imageUploadPreview.className = "img-upload__preview" + ' effects__preview--' + currentEffectName;

            effectPin.style.left = "100%";
            effectDepth.style.width = "100%";
            effectValue.value = 100;

            effects[currentEffectName](100);
        });
    });


    /**
     * Перетаскивание слайдера
     */
    effectPin.addEventListener('mousedown', function(evt){
        var clientLineWidth = effectLine.clientWidth;
        var pinPercentPosition;

        var startCoords = {
            x: evt.clientX
        };

        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();

            var shift = {
                x: startCoords.x - moveEvt.clientX
            };

            startCoords = {
                x: moveEvt.clientX
            };

            var futurePinPosition = effectPin.offsetLeft - shift.x;

            if(futurePinPosition <= 0) {
                effectPin.style.left = "0px";
                pinPercentPosition = 0;
            } else if (futurePinPosition >= clientLineWidth) {
                effectPin.style.left = clientLineWidth + "px";
                pinPercentPosition = 100;
            } else {
                effectPin.style.left = futurePinPosition + 'px';
                pinPercentPosition = Math.round(futurePinPosition * 100 / clientLineWidth * 100) / 100;
            }

            effectDepth.style.width = futurePinPosition + "px";
            effectValue.value = Math.round(pinPercentPosition);

            effects[currentEffectName](pinPercentPosition);
        };

        var onMouseUp = function (upEvt) {
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });


    /**
     * Валидация поля комментария
     */
    descriptionInput.addEventListener('change', function () {
        if (descriptionInput.validity.tooLong) {
            descriptionInput.setCustomValidity('Поле не должно превышать 140 символов');
            return false;
        } else {
            descriptionInput.setCustomValidity('');
        }
    });

    /**
     * Валидация поля с хэштегами
     */
    hashtagsInput.addEventListener('input', function (evt) {
        var target = evt.target;

        var hashtagsArray = target.value.toLowerCase().split(' ');
        var isHashtagsValid = true;

        if(hashtagsArray.length > 5) {
            target.setCustomValidity('не более пяти хэштегов');
            target.reportValidity();
            isHashtagsValid = false;
        } else {
            var uniqueArray = [];

            hashtagsArray.forEach(function (hashtag) {
                if (hashtag === '' | hashtag === '#') {
                    target.setCustomValidity('хеш-тег не может быть пустым');
                    target.reportValidity();
                    isHashtagsValid = false;
                } else if (hashtag[0] !== '#') {
                    target.setCustomValidity('хэш-тег начинается с символа #');
                    target.reportValidity();
                    isHashtagsValid = false;
                } else if (hashtag.length > 20) {
                    target.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
                    target.reportValidity();
                    isHashtagsValid = false;
                } else if (!uniqueArray.includes(hashtag)){
                    uniqueArray.push(hashtag);
                } else {
                    target.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
                    target.reportValidity();
                    isHashtagsValid = false;
                }
            });
        }

        if (isHashtagsValid) {
            target.setCustomValidity('');
        }
    });


    /**
     * Конструктор всплывающего ответа после отправки формы
     *
     * @param {Element} template
     * @param {String} closeBtnSelector
     * @constructor
     */
    var FormAnswer = function (template, closeBtnSelector) {
        this.template = template;
        this.closeBtnSelector = closeBtnSelector;
        this.closeBtn = null;
        this.element = null;

        this.init();
    }

    FormAnswer.prototype = {
        /**
         * Добавление на страницу попапа
         */
        generateAnswer: function () {
            var fragment = document.createDocumentFragment();

            this.element = this.template.cloneNode(true);
            fragment.appendChild(this.element);
            document.querySelector('main').appendChild(fragment);

            this.closeBtn = document.querySelector(this.closeBtnSelector);
            this.closeBtn.addEventListener('click', this.onBtnRemoveBind);
            document.addEventListener('keyup', this.onPopupEscCloseBind);
        },

        /**
         * Удаление со страницы попапа
         */
        removeAnswer: function () {
            this.closeBtn.removeEventListener('click', this.onBtnRemoveBind);
            document.removeEventListener('keyup', this.onPopupEscCloseBind);

            this.element.remove();
        },

        /**
         * Обработчик закрытия попапа по клику на Esc
         *
         * @param evt
         */
        onPopupEscClose: function (evt) {
            console.log('test');
            if(evt.keyCode === window.utils.ESC_CODE) {
                this.removeAnswer();
            }
        },

        /**
         * Функция при инициализации попапа
         */
        init: function () {
            this.onPopupEscCloseBind = this.onPopupEscClose.bind(this);
            this.onBtnRemoveBind = this.removeAnswer.bind(this);
        }
    }

    /**
     * Инициализация формы ошибки и успеха
     * @type {FormAnswer}
     */
    var successFormAnswer = new FormAnswer(document.querySelector('#success').content.querySelector('.success'), '.success__button');
    var errorFormAnswer = new FormAnswer(document.querySelector('#error').content.querySelector('.error'), '.error__button');


    /**
     * Обработчик отправки формы с фото
     */
    uploadPhotoForm.addEventListener('submit', function (evt){
        evt.preventDefault();
        var form = evt.target;

        window.ajaxSubmit(form, function (response) {
            successFormAnswer.generateAnswer();
        }, function (response) {
            errorFormAnswer.generateAnswer();
        });

        resetPhotoPopupData();
        formPopup.closePopup();
    });


})();