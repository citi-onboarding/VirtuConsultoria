$(document).ready(function () { // ações realizadas via jquery
    $('#id_telefone').mask('(00) 0 0000-0000'); // Customização do input "Telefone"

    $('option:first').hide(); // Esconde a opção Selecione no input "Como conheceu a Virtù"

    $('#carrossel').slick({
        infinite: false, // o carrosel não volta pro começo quando acaba
        slidesToShow: 3, // mostra 3 cards por vez
        slidesToScroll: 3, // passa 3 cards por vez
        arrows: true, // utiliza as setas do próprio slick
        dots: true, // bolinhas indicando em que slide o user está
        focusOnSelect: false, // realce feito com css
        dotsClass: 'slick-dots dots-css', // opção para estilizar as bolinhas do slick
        responsive: [ // reajuste do slick de acordo com a max-width
            {
                breakpoint: 1024, // mostra e passa 2 por vez quando a width eh menor que  1024
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