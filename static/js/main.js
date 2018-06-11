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
    pegaHttp(popularServicos);
});

function pegaHttp(successo) { // função standard de request http
    var http = new XMLHttpRequest();
    // a parte 'alt=json' eh da API do google que transforma a planilha num JSON
    var url = 'https://spreadsheets.google.com/feeds/list/1OdQ52u7NODWOC8b7CELRd6IU9dVBCSUr3Aamv4ze39k/od6/public/values?alt=json';

    http.open('GET', url, true); // realiza o request via AJAX com método GET

    http.onreadystatechange = () => { // testa se já recebeu a resposta
        if (http.readyState === 4 && http.status === 200) {
            // readyState 4 significa que o request está completo
            // status 200 significa que deu certo 
            // (404 é que n encontrou, 500 é erro interno do servidor e assim por diante...)
            successo(http.response); // caso tudo esteja ok, chama a função de callback que a gnt passou
        }
    }

    http.send(); // envia o request
}

const numDeServicos = 7;
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
        titulo: 'Reunião1',
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


function popularServicos(resposta) {
    let ordemServicos = [];
    let dados = JSON.parse(resposta).feed.entry;
    let j = 0;
    for (dado in dados) {
        ordemServicos.push(parseInt(dados[j]['gsx$servicos']['$t']) - 1);
        j++;
    }
    if (validaSheet(ordemServicos) && ordemServicos.length <= 7) {
        for (i = 0; i < ordemServicos.length; i++) {
            $('#carrossel').find('.card-flex').find('h3')[i].innerText = conteudoServicos[ordemServicos[i]].titulo;
            $('#carrossel').find('.card-flex').find('p')[i].innerText = conteudoServicos[ordemServicos[i]].descricao;
            $('#carrossel').find('.card-flex').find('.card-img')[i].style.backgroundImage = 'url(' + conteudoServicos[ordemServicos[i]].imagem + ')';
        }
    }
}

function validaSheet(ordemServicos) {
    let temp = [];
    let flag = 1;
    let padrao = [0, 1, 2, 3, 4, 5, 6]
    for(i = 0; i < ordemServicos.length; i++){
        if(padrao.indexOf(ordemServicos[i]) === -1){
            flag = 0;
        }
        if(temp.indexOf(ordemServicos[i]) === -1){
            temp.push(ordemServicos[i]);
        }
        else{
            flag = 0;
        }
    }
    console.log(temp);
    return flag;
}