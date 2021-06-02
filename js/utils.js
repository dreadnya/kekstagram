'use strict';

(function (){
    window.utils = {
        ESC_CODE: 27,

        //Генерация рандомного целого числа
        getRandomInt (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }
    }
})();