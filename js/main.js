'use strict';

var COMMENT_MESSAGES = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

var NAMES = [
    "Вячеслав Залупенко",
    "Илья Леванов",
    "Ильфат Юзаев",
    "Игорь Бабушкин",
    "АноНиММчиГг",
    "Принцесса228",
    "Admin",
    "Кекс",
    "Гарри Поттер",
    "Будин",
    "Троюродная тетя",
    "Константин Константиныч",
    "Гоша",
    "Валентина Непобедима",
    "Какой-то хмырь"
];

var photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var photosContainer = document.querySelector('.pictures');

//Генерация рандомного целого числа
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

//Генерация массива комментов
var generateComment = function (commentCount) {
    var commentsList = [];

    for (var i = 0; i < commentCount; i++) {
        var comment = {
            avatar: "img/avatar-"+ getRandomInt(1, 7) +".svg",
            message: COMMENT_MESSAGES[getRandomInt(0, 6)],
            name: NAMES[getRandomInt(0, 15)]
        }

        commentsList.push(comment);
    }

    return commentsList;
}

//Генерация массива с фотками
var generatePhotosData = function (generateCount){
    var photosData = [];

    for (var i = 0; i < generateCount; i++) {
        var photoObject = {
            url: "photos/" + (i+1) + ".jpg",
            likes: getRandomInt(15, 201),
            comments: generateComment(getRandomInt(1, 5))
        }

        photosData.push(photoObject);
    }

    return photosData;
}

//Создание html элемента фотографии
var createPhotoElement = function (photoData) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('img').src = photoData.url;
    photoElement.querySelector('.picture__likes').textContent = photoData.likes;
    photoElement.querySelector('.picture__comments').textContent = photoData.comments.length;

    return photoElement;
}

//Вывод фоток на экран
var renderPhotos = function () {
    var photosData = generatePhotosData(25);
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosData.length; i++) {
        fragment.appendChild(createPhotoElement(photosData[i]));
    }

    photosContainer.appendChild(fragment);
}

renderPhotos();