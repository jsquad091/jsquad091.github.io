// Get all imgs with data-src attibute
const imagesToLoad = document.querySelectorAll('img[data-src]');

// IntersectionalObserver
const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
};

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {image.removeAttribute('data-src');};
};

// First check to see if the IO is supported
if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver ((items, observer) => {
        items.forEach((item) => {
            if(item.isIntersecting) {
                loadImages(item.target);
                imgObserver.unobserve(item.target);
            }
        });
    }, imgOptions);

    imagesToLoad.forEach((img) => {
        imgObserver.observe(img)
    });
}
else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}