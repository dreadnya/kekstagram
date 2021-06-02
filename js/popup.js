'use strict';

(function (){

    /**
     * Конструктор попап окна
     *
     * @param {Element} DOMElement - Ссылка на DOM попапа
     * @constructor
     */
    window.Popup = function (DOMElement) {
        this.DOMElement = DOMElement;
        this.closeBtn = this.DOMElement.querySelector('.cancel');
        this.inputs = this.DOMElement.querySelectorAll('input:not([type=radio]), textarea'),
        this.beforeOpen = null;
        this.afterClose = null;
        this.onInit = null;

        this.init();
    }

    Popup.prototype = {
        /**
         * Функция открытия попапа
         */
        openPopup : function () {
            if (this.beforeOpen) {
                this.beforeOpen();
            }
            this.DOMElement.classList.remove('hidden');

            document.addEventListener('keyup', this.onPopupEscCloseBind);
        },

        /**
         * Функция закрытия попапа
         */
        closePopup : function () {
            this.DOMElement.classList.add('hidden');

            document.removeEventListener('keyup', this.onPopupEscCloseBind);

            if (this.afterClose) {
                this.afterClose();
            }
        },

        /**
         * Обработчик закрытия попапа по клику на Esc
         *
         * @param evt
         */
        onPopupEscClose: function (evt) {
            if(evt.keyCode === window.utils.ESC_CODE) {
                this.closePopup();
            }
        },

        /**
         * Функция при инициализации попапа
         */
        init: function () {
            this.onPopupEscCloseBind = this.onPopupEscClose.bind(this);
            this.closeBtn.addEventListener('click', this.closePopup.bind(this));

            // Убираем возможность закрытия попапа, когда фокус стоит на инпуте
            this.inputs.forEach(function (input) {
                var _this = this;
                input.addEventListener('focusin', function (){
                    document.removeEventListener('keyup', _this.onPopupEscCloseBind);
                });

                input.addEventListener('focusout', function (){
                    document.addEventListener('keyup', _this.onPopupEscCloseBind);
                });
            }, this)

            if (this.onInit) {
                this.onInit();
            }
        }
    }

})();