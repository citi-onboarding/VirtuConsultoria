// valor passado na criação dos serviços caso a planilha contenha algum erro
const padrao = [0, 1, 2, 3, 4, 5, 6];

// variável que contém o conteúdo vindo de servicos.json
let conteudoServicos;

var navbarHeight = 74;

var bannerHeight = $('#banner').height();
var servicoHeight = 0;
var sobrenosHeight = 0;
var depoimentosHeight = 0;
var contatosHight = 0;

$(document).ready(function () { // ações realizadas via jquery

    $('#id_telefone').mask('(00) 0 0000-0000'); // Customização do input "Telefone"

    // Esconde a opção Selecione no input "Como conheceu a Virtù"
    $('option:first').hide();

    // contante recebe o conteudo do arquivo local 'servicos.json'
    $.getJSON("static/js/servicos.json", function (json) {

        conteudoServicos = json; // guarda o valor recebido do json

        // função chamada após o término do request json
        pegarHttp(popularServicos);
    });

    depoimentoSlick();

    $('a').on('click', function (event) {
        if (this.hash !== '') {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top - navbarHeight
            }, 500);
        }
    });

    $('#hamburguer-icon').on('click', function (event) {
        if (document.getElementById('hamburguer-opcoes').style.display == "none") {
            document.getElementById('hamburguer-opcoes').style.display = "block";

        } else {
            document.getElementById('hamburguer-opcoes').style.display = "none";
        }
    });

    window.onload = navbarResponsiva;
    window.onscroll = navbarResponsiva;
    window.onresize = navbarResponsiva;

});

function navbarResponsiva () {
    var scroll = $(window).scrollTop();
    var w = $(window).width();
    if (scroll >= 10 && w > 850) {
        document.getElementById('logovirtu').style.height = "65px";
        document.getElementById('sublogovirtu').style.display = "none";
        document.getElementById('logovirtu').style.paddingTop = "5px";
        document.getElementById('navbar-img').style.paddingLeft = "0";
        document.getElementById('navbar').style.backgroundColor = "#1B1B1B";
        document.getElementById('hamburguer-icon').style.display = "none";
        navbarHeight = 74;
    } else if (w > 850) {
        document.getElementById('hamburguer-icon').style.display = "none";
        document.getElementById('sublogovirtu').style.display = "block";
        document.getElementById('logovirtu').style.height = "110px";
        document.getElementById('navbar-img').style.paddingLeft = "20px";
        document.getElementById('logovirtu').style.paddingTop = "20px";
        document.getElementById('navbar').style.backgroundColor = "transparent";
        navbarHeight = 74;
    } else if (scroll >= 10) {
        document.getElementById('logovirtu').style.height = "55px";
        document.getElementById('logovirtu').style.paddingTop = "5px";
        document.getElementById('hamburguer-icon').style.display = "block";
        document.getElementById('navbar-img').style.paddingLeft = "0";
        document.getElementById('sublogovirtu').style.display = "none";
        document.getElementById('navbar-flex').style.justifyContent = "space-between";
        document.getElementById('navbar').style.backgroundColor = "#1B1B1B";
        document.getElementById('hamburguer-opcoes').style.display = "none";
    } else if (w > 470){
        document.getElementById('logovirtu').style.height = "110px";
        document.getElementById('navbar-img').style.padding = "0";
        document.getElementById('sublogovirtu').style.display = "block";
        document.getElementById('logovirtu').style.paddingTop = "20px";
        document.getElementById('logovirtu').style.paddingLeft = "0";
        document.getElementById('navbar').style.backgroundColor = "transparent";
        document.getElementById('navbar-flex').style.justifyContent = "center";
        document.getElementById('hamburguer-icon').style.display = "none";
        navbarHeight = 64;
    } else {
        document.getElementById('logovirtu').style.height = "80px";
        document.getElementById('navbar-img').style.padding = "0";
        document.getElementById('sublogovirtu').style.display = "block";
        document.getElementById('logovirtu').style.paddingTop = "10px";
        document.getElementById('logovirtu').style.paddingLeft = "0";
        document.getElementById('navbar').style.backgroundColor = "transparent";
        document.getElementById('navbar-flex').style.justifyContent = "center";
        document.getElementById('hamburguer-icon').style.display = "none";
        navbarHeight = 64;
    } 
    scroll = parseInt(scroll) + navbarHeight + 2;
    console.log(scroll + ' ' + bannerHeight);
    if (scroll < bannerHeight) {
        $('#navbar-a-servico').removeAttr('style'); //Tira formatação do servico
        $('#navbar-a-sobrenos').removeAttr('style'); //Tira formatação do sobrenos
        $('#navbar-a-depoimentos').removeAttr('style'); //Tira formatação do depoimento
        $('#navbar-a-contatos').removeAttr('style'); //Tira formatação do contato
    } else if(scroll >= bannerHeight && scroll < servicoHeight){
        $('#navbar-a-sobrenos').removeAttr('style'); //Tira formatação do sobrenos
        $('#navbar-a-depoimentos').removeAttr('style'); //Tira formatação do depoimento
        $('#navbar-a-contatos').removeAttr('style'); //Tira formatação do contato
        document.getElementById('navbar-a-servico').style.color = "#BF3B3A";
    } else if (scroll >= servicoHeight && scroll < sobrenosHeight) {
        $('#navbar-a-servico').removeAttr('style'); //Tira formatação do servico
        $('#navbar-a-depoimentos').removeAttr('style'); //Tira formatação do depoimento
        $('#navbar-a-contatos').removeAttr('style'); //Tira formatação do contato
        document.getElementById('navbar-a-sobrenos').style.color = "#BF3B3A";
    } else if (scroll >= sobrenosHeight && scroll < depoimentosHeight){
        $('#navbar-a-servico').removeAttr('style'); //Tira formatação do servico
        $('#navbar-a-sobrenos').removeAttr('style'); //Tira formatação do sobrenos
        $('#navbar-a-contatos').removeAttr('style'); //Tira formatação do contato
        document.getElementById('navbar-a-depoimentos').style.color = "#BF3B3A";
    } else {
        $('#navbar-a-servico').removeAttr('style'); //Tira formatação do servico
        $('#navbar-a-sobrenos').removeAttr('style'); //Tira formatação do sobrenos
        $('#navbar-a-depoimentos').removeAttr('style'); //Tira formatação do depoimento
        document.getElementById('navbar-a-contatos').style.color = "#BF3B3A";
    }
}

$(window).resize(function () {
    var w = $(window).width();
    var scroll = $(window).scrollTop();
    servicoHeight = $('#servico').height() + bannerHeight;
    sobrenosHeight = $('#sobre-nos').height() + servicoHeight;
    depoimentosHeight = $('#depoimentos').height() + sobrenosHeight;
    contatosHight = $('#contatos').height() + depoimentosHeight;
    if (w > 850) {
        document.getElementById('hamburguer-icon').style.display = "none";
        document.getElementById('navbar-flex').style.justifyContent = "space-between";
        document.getElementById('hamburguer-opcoes').style.display = "none";
        document.getElementById('navbar-img').style.paddingLeft = "40px";
        document.getElementById('logovirtu').style.height = "110px";
    } else if (scroll >= 50) {
        document.getElementById('logovirtu').style.height = "70px";
        document.getElementById('hamburguer-icon').style.display = "block";
        document.getElementById('navbar-flex').style.justifyContent = "space-between";
        document.getElementById('navbar-img').style.paddingLeft = "20px";
    } else if (w > 470){
        document.getElementById('logovirtu').style.height = "110px";
        document.getElementById('navbar-img').style.paddingLeft = "0";
        document.getElementById('navbar-flex').style.justifyContent = "center";
    } else {
        document.getElementById('logovirtu').style.height = "80px";
        document.getElementById('navbar-img').style.paddingLeft = "0";
        document.getElementById('navbar-flex').style.justifyContent = "center";
    }

});

function pegarHttp(successo) { // função standard de request http

    var http = new XMLHttpRequest();

    // a parte 'alt=json' eh da API do google que transforma a planilha num JSON
    var url = 'https://spreadsheets.google.com/feeds/list/1OdQ52u7NODWOC8b7CELRd6IU9dVBCSUr3Aamv4ze39k/od6/public/values?alt=json';

    http.open('GET', url, true); // realiza o request via AJAX com método GET

    http.onreadystatechange = () => { // testa se já recebeu a resposta

        if (http.readyState === 4 && http.status === 200) {
            /* readyState 4 significa que o request está completo
            status 200 significa que deu certo 
            (404 é que n encontrou, 500 é erro interno do servidor e assim por diante...) */

            // caso tudo esteja ok, chama a função de callback que a gnt passou
            successo(http.response);
        }
    }

    http.send(); // envia o request
}

function criarServicos(ordemServicos, flag) { // gera o conteúdo da div carrossel

    // card eh a estrutura básica, em html, de cada serviço dentro do carrossel
    let card = '<div class="card"><div class="card-flex" onclick="irParaContato()"><div class="card-img"></div><div class="card-conteudo"><h3 class="card-titulo"></h3><hr class="card-linha"><p class="card-descricao"></p></div></div></div>';

    let copiaCard = card; // copia feita pra criar múltiplos cards dentro de carrossel

    let NumDeCards = padrao.length; // número de cards padrão caso tenha erro

    // caso a planilha esteja ok, serão gerados tantos cards quantos constam na mesma
    if (flag) NumDeCards = ordemServicos.length;

    // criação dos múltiplos cards
    for (i = 0; i < NumDeCards - 1; i++) {
        card += copiaCard;
    }

    $('#carrossel').html(card); // inserção dos cards dentro da div carrossel

    /* substitue a estrutura padrão dos cards, passando, através de 
    uma estrutura ternária, se o conteúdo será puxado do sheets ou não */
    substituirServicos(flag ? ordemServicos : padrao);

    /* chama o slick pra organizar o carrosel depois que os cards já estão 
    criados e substituídos com seus respectivos conteúdos */

    $('#carrossel').slick({ // gera o carrossel através da biblioteca slick
        slidesToShow: 3, // mostra 3 cards por vez
        slidesToScroll: 3, // passa 3 cards por vez
        arrows: true, // utiliza as setas do próprio slick
        dots: true, // bolinhas indicando em que slide o user está
        focusOnSelect: false, // realce feito com css
        dotsClass: 'slick-dots dots-css', // opção para estilizar as bolinhas do slick
        responsive: [ // reajuste do slick de acordo com a max-width
            {
                // mostra e passa 2 por vez quando a width eh menor que 1024
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                // mostra e passa 1 por vez quando a width eh menor que 720
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    servicoHeight = $('#servico').height() + bannerHeight;
    sobrenosHeight = $('#sobre-nos').height() + servicoHeight;
    depoimentosHeight = $('#depoimentos').height() + sobrenosHeight;
    contatosHight = $('#contatos').height() + depoimentosHeight;
}

// substitui o conteúdo de cada card, via jquery, de acordo com a ordem do sheets
function substituirServicos(ordemServicos) {
    for (i = 0; i < ordemServicos.length; i++) {
        $('#carrossel').find('.card-flex').find('h3')[i].innerText = conteudoServicos[ordemServicos[i]].titulo;
        $('#carrossel').find('.card-flex').find('p')[i].innerText = conteudoServicos[ordemServicos[i]].descricao;
        $('#carrossel').find('.card-flex').find('.card-img')[i].style.backgroundImage = 'url(' + conteudoServicos[ordemServicos[i]].imagem + ')';
    }
}

/* função chamada depois que o request do json da planilha está pronto,
então tratamos os dados recebidos de acordo com a API do google
e por fim guardamos os valores dentro de ordemServicos */

function popularServicos(resposta) {

    let ordemServicos = [];

    // função JSON para transformar uma string JSON em um objeto
    let dados = JSON.parse(resposta).feed.entry;

    let j = 0;
    for (dado in dados) {

        // 'gsx$servicos' => servicos eh o subtítulo que tá na planilha
        // '$t' eh da API
        ordemServicos.push(parseInt(dados[j]['gsx$servicos']['$t']) - 1);

        /* subtrai 1 do item da planilha, pois na planilha a contagem 
        começa do 1 enquanto que o array começa do 0 */
        j++;
    }

    // ordemServicos = [1, 0, 2, 3];

    // chama função de validação antes de substituir o conteúdo dos cards
    // confere se a quantidade de números da planilha eh menor que o número de serviços
    if (validarSheet(ordemServicos) && ordemServicos.length <= padrao.length) {
        substituirServicos(ordemServicos);
    }
}

// testa se na planilha existem números repetidos ou letras (erro)
function validarSheet(ordemServicos) {
    let temp = []; // array temporário para conferir repetições

    // flag que será retornada
    let flag = 1;
    // começa como true e soh altera pra false caso haja erro

    for (i = 0; i < ordemServicos.length; i++) { // passa pelo array vindo da planilha
        if (padrao.indexOf(ordemServicos[i]) === -1) {
            // caso tenha algo que não consta no array 'padrao' retorna erro
            flag = 0;
        }
        if (temp.indexOf(ordemServicos[i]) === -1) {

            /* confere se o item 'i' de ordemServicos está contido dentro
            de temp (que a princípio está vazio), caso não, adiciona o item à temp.
            Caso temp contenha esse item, significa que ordemServicos tem duplicata,
            retornando erro.*/

            temp.push(ordemServicos[i]);
        }
        else {
            flag = 0;
        }
    }

    criarServicos(ordemServicos, flag); // cria os serviços antes de substituí-los
    return flag; // retorna se houve erro
}

function website(link) { //Recebe o link do html de acordo com a div
    window.open(link); //Abre o link recebido em outra janela
}

function initMap() {
    var uluru = { lat: -8.0498704, lng: -34.9542109 }; //Coordenadas do CFCH
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,  //Disposição do mapa na tela
        center: uluru
    });
}

function depoimentoSlick() {
    $('#carrossel-depoimentos').slick({ // gera o carrossel através da biblioteca slick
        infinite: true, // o carrosel não volta pro começo quando acaba
        slidesToShow: 1, // mostra 1 card por vez
        slidesToScroll: 1, // passa 1 card por vez
        dots: true, // bolinhas indicando em que slide o user está
        arrows: false, // setas laterais escondidas
        focusOnSelect: true, // realce feito com css
        dotsClass: 'slick-dots dots-css', // opção para estilizar as bolinhas do slick
    });
}

function website(link) {
    window.open(link);
}

function initMap() {
    var coords = { lat: -8.0517075, lng: -34.9540205 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: coords
    });
    var marker = new google.maps.Marker({
        position: coords,
        map: map
    });
}

function irParaContato() {
    $('html, body').animate({
        scrollTop: $('#contatos').offset().top - 90
    }, 500);
}