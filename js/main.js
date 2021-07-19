import galleryItems from './app.js';
// console.log(galleryItems);

const refs = {
    galleryListRef: document.querySelector('.js-gallery'),
    backdropRef: document.querySelector('.js-lightbox'),
    lightboxImg: document.querySelector('.lightbox__image'),
    lightboxOverlay: document.querySelector('div.lightbox__overlay'),
    modal: document.querySelector('.lightbox__content'),
    btnModalClose: document.querySelector('[data-action="close-lightbox"]'),
};

function createGallery(gallery) {
    return gallery
        .map(({ preview, original, description }, index) => {
            return `<li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    data-index="${index}"
                />
            </a>
        </li>`;
        })
        .join('');
}

const imgGallery = createGallery(galleryItems);
refs.galleryListRef.insertAdjacentHTML('beforeend', imgGallery);

refs.galleryListRef.addEventListener('click', onClickGalleryItem);
refs.btnModalClose.addEventListener('click', onCloseButtonClick);
refs.lightboxOverlay.addEventListener('click', onCloseOverlayClick);

function onClickGalleryItem(evt) {
    evt.preventDefault();
    window.addEventListener('keydown', onClickEsc);
    const target = evt.target;
    if (target.nodeName !== 'IMG') {
        return;
    }
    if (target.nodeName === 'IMG') {
        refs.backdropRef.classList.add('is-open');
        refs.lightboxImg.src = target.dataset.source;
        refs.lightboxImg.alt = target.alt;
        refs.lightboxImg.dataset.index = evt.target.dataset.index;
    }
}

function onClickCloseModal() {
    refs.backdropRef.classList.remove('is-open');
}

function onCloseButtonClick(evt) {
    window.removeEventListener('keydown', onClickEsc);

    evt.preventDefault();
    onClickCloseModal();

    refs.lightboxImg.src = '';
    refs.lightboxImg.alt = '';
}

function onCloseOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        onClickCloseModal();
    }
}

function onClickEsc(evt) {
    const ESC_KEY_CODE = 'Escape';
    if (evt.code === ESC_KEY_CODE) {
        onClickCloseModal();
    }
}

window.addEventListener('keydown', evt => {
    if (evt.code === 'ArrowLeft') {
        onArrowLeft();
    }
    if (evt.code === 'ArrowRight') {
        onArrowRight();
    }
});

function onArrowLeft() {
    const index = +refs.lightboxImg.dataset.index;

    if (index === 0) {
        newSrc(index, galleryItems.length - 1);
        return;
    }
    newSrc(index, -1);
}

function onArrowRight() {
    const index = +refs.lightboxImg.dataset.index;
    if (index === galleryItems.length - 1) {
        newSrc(0);
        return;
    }
    newSrc(index, 1);
}

function newSrc(index, step = 0) {
    refs.lightboxImg.dataset.index = `${index + step}`;
    refs.lightboxImg.src = galleryItems[index + step].original;
}

console.log('Дмитрий, ошибок не обнаружено');
