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

function onClickGalleryItem(evt) {
    evt.preventDefault();
    window.addEventListener('keydown', onClickEsc);
    const target = e.target;
    if (target.nodeName !== 'IMG') {
        return;
    }

    refs.backdropRef.classList.add('is-open');
    refs.lightboxImg.src = target.dataset.source;
    refs.lightboxImg.alt = target.alt;
    refs.lightboxImg.dataset.index = e.target.dataset.index;
}

function onClickCloseModal() {
    refs.backdrop.classList.remove('is-open');
}

refs.btnModalClose.onclick = e => {
    window.removeEventListener('keydown', onClickEsc);

    e.preventDefault();
    onClickCloseModal();

    refs.lightboxImg.src = '';
    refs.lightboxImg.alt = '';
};

refs.lightboxOverlay.onclick = e => {
    if (e.target === e.currentTarget) {
        onClickCloseModal();
    }
};

function onClickEsc(e) {
    const ESC_KEY_CODE = 'Escape';
    if (e.code === ESC_KEY_CODE) {
        onClickCloseModal();
    }
}

window.addEventListener('keydown', e => {if})
