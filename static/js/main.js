$(document).ready(function () {
    $('#id_telefone').mask('(00) 0 0000-0000');

    $('option:first').hide();

    $('#carrossel').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        dots: true,
        focusOnSelect: false,
        dotsClass: 'slick-dots dots-css',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
});