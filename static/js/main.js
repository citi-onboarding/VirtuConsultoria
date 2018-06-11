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

    popularServicos();
});

$(function(){
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if(scroll >= 100){
            document.getElementById('logovirtu').src = "static/image/Logo - navbar.png" ;
            document.getElementById('logovirtu').style.height = "70px";
            document.getElementById('logovirtu').style.padding = "10px";
            document.getElementById('logovirtu').style.transitionDuration = "500ms";
            document.getElementById('navbar').style.backgroundColor = "#1B1B1B";
            document.getElementById('navbar').style.transitionDuration = "500ms";
        } else {
            document.getElementById('logovirtu').src = "static/image/Logo - Banner.png" ;
            document.getElementById('logovirtu').style.height = "250px";
            document.getElementById('navbar').style.backgroundColor = "transparent";
        }
    });
});
let numDeServicos = 7;
let conteudoServicos = [
    {
        titulo: 'Documentação',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend efficitur rutrum.Praesent suscipit tortor in elit vehicula aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        imagem: '/static/image/Documentação.jpg'
    },
    {
        titulo: 'Pesquisa',
        descricao: 'Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend efficitur rutrum.Praesent suscipit tortor in elit vehicula aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        imagem: '/static/image/Documentação.jpg'
    },
    {
        titulo: 'Reunião',
        descricao: 'Lorem Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend efficitur rutrum.Praesent suscipit tortor in elit vehicula aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        imagem: '/static/image/Documentação.jpg'
    },
    {
        titulo: 'Consultoria',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend efficitur rutrum.Praesent suscipit tortor in elit vehicula aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        imagem: '/static/image/Documentação.jpg'
    },
    {
        titulo: 'Pesquisa',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend efficitur rutrum.Praesent suscipit tortor in elit vehicula aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        imagem: '/static/image/Documentação.jpg'
    },
    {
        titulo: 'Pesquisa',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend efficitur rutrum.Praesent suscipit tortor in elit vehicula aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        imagem: '/static/image/Documentação.jpg'
    },
    {
        titulo: 'Pesquisa',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend efficitur rutrum.Praesent suscipit tortor in elit vehicula aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        imagem: '/static/image/Documentação.jpg'
    },
];

function popularServicos(){
    if(conteudoServicos.length !== 0){
        for(i=0; i<numDeServicos; i++){
            $('#carrossel').find('.card-flex').find('h3')[i].innerText = conteudoServicos[i].titulo;
            $('#carrossel').find('.card-flex').find('p')[i].innerText = conteudoServicos[i].descricao;
            $('#carrossel').find('.card-flex').find('.card-img')[i].style.backgroundImage = 'url('+conteudoServicos[i].imagem+')';
        }
    }

}
