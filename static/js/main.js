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
        var w =  $(window).width();
        if(scroll >= 100 && w > 850){
            document.getElementById('logovirtu').src = "static/image/Logo - navbar.png" ;
            document.getElementById('logovirtu').style.height = "70px";
            document.getElementById('logovirtu').style.paddingTop = "10px";
            document.getElementById('logovirtu').style.paddingBottom = "10px";
            document.getElementById('navbar').style.backgroundColor = "#1B1B1B";
        } else if(w > 850) {
            document.getElementById('logovirtu').src = "static/image/Logo - Banner.png" ;
            document.getElementById('logovirtu').style.height = "250px";
            document.getElementById('logovirtu').style.padding = "0";
            document.getElementById('navbar').style.backgroundColor = "transparent";
        } else if (scroll >= 50) {
            document.getElementById('logovirtu').src = "static/image/Logo - navbar.png" ;
            document.getElementById('logovirtu').style.height = "60px";
            document.getElementById('logovirtu').style.paddingTop = "10px";
            document.getElementById('logovirtu').style.paddingBottom = "10px";
            document.getElementById('hamburguer-icon').style.display = "block";
            document.getElementById('navbar-flex').style.justifyContent = "space-between";
            document.getElementById('navbar').style.backgroundColor = "#1B1B1B";
        } else {
            document.getElementById('logovirtu').src = "static/image/Logo - Banner.png" ;
            document.getElementById('logovirtu').style.height = "250px";
            document.getElementById('logovirtu').style.padding = "0";
            document.getElementById('navbar').style.backgroundColor = "transparent";
            document.getElementById('hamburguer-icon').style.display = "none";
            document.getElementById('navbar-flex').style.justifyContent = "center";
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

$('a').on('click', function (event) {
    if (this.hash !== '') {
        event.preventDefault();
        var hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top - 90
        }, 500, function () {
        });
    }
});

$(document).ready(function(){
    $('#hamburguer-icon').on('click', function() {
        $('nav ul').toggleClass('mostrar');
    });
});