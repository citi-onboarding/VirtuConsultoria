// valor passado na criação dos serviços caso a planilha contenha algum erro
const padrao = [0, 1, 2, 3, 4, 5, 6, 7];

// variável que contém o conteúdo vindo de servicos.json
let conteudoServicos;

var navbarHeight = 74;

var bannerHeight = $('#banner').height();
var servicoHeight = 0;
var sobrenosHeight = 0;
var depoimentosHeight = 0;
var contatosHight = 0;

var logoVirtu = document.getElementById('logovirtu');
var navbarText = document.getElementById('navbar-text');
var navbarFlex =  document.getElementById('navbar-flex');
var navbarImg = document.getElementById('navbar-img');
var navbar = document.getElementById('navbar');
var hamburguerIcon =  document.getElementById('hamburguer-icon');
var hamburguerOpcoes =  document.getElementById('hamburguer-opcoes');
var lastNumber = 0;
var navbarOpcoes = document.getElementById('navbar-opcoes');

var navServico = $('#navbar-a-servico');
var navSobenos = $('#navbar-a-sobrenos');
var navDepoimento = $('#navbar-a-depoimentos');
var navContatos = $('#navbar-a-contatos');

$(document).ready(function () { // ações realizadas via jquery
    $('#emailErro').hide();
    $('form').submit(function(e) {
        let email = $('#id_email').val();
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true);
        }
        e.preventDefault();
        $('#emailErro').show();
        return (false);
    }); 

    $('#id_telefone').mask('(00) 0 0000-0000'); // Customização do input "Telefone"

    // Desabilita a opção Selecione no input "Como conheceu a Virtù"
    $('option:first').attr('disabled', 'disabled');
    $('option:first').attr('style', 'background-color: white !important');

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
            var dist = ($(hash).offset().top - $(window).scrollTop()) / 1.5;

            $('html, body').animate({
                scrollTop: $(hash).offset().top - navbarHeight + 10
            }, Math.abs(dist));
        }
    });

    $('#hamburguer-icon').on('click', function (event) {
        if (hamburguerOpcoes.style.display == "none") {
            $("#hamburguer-opcoes").slideDown("slow");
        } else {
            $("#hamburguer-opcoes").slideUp("slow");
        }
    });

    window.onload = navbarResponsiva;
    window.onscroll = navbarResponsiva;
    window.onresize = navbarResponsiva;

});

function navbarResponsiva() {
    var scroll = $(window).scrollTop();
    var w = $(window).width();
    hamburguerOpcoes.style.display = "none";
    if (lastNumber != 1 && scroll >= 10 && w >= 850) {
        logoVirtu.style.height = "65px";
        navbarText.style.display = "none";
        logoVirtu.style.paddingTop = "5px";
        navbarImg.style.paddingLeft = "20px";
        navbar.style.backgroundColor = "#1B1B1B";
        hamburguerIcon.style.display = "none";
        navbarOpcoes.style.display = "flex";
        lastNumber = 1;
    } else if (lastNumber != 2 && scroll < 10 && w >= 850) {
        hamburguerIcon.style.display = "none";
        navbarText.style.display = "block";
        logoVirtu.style.height = "110px";
        navbarImg.style.padding= "0 0 0 20px";
        navbar.style.backgroundColor = "transparent";
        navbarText.style.justifyContent = "space-between";
        hamburguerOpcoes.style.display = "none";
        logoVirtu.style.height = "110px";
        navbarOpcoes.style.display = "flex";
        lastNumber = 2;
    } else if (lastNumber != 3 && scroll >= 10 && w < 850) {
        hamburguerOpcoes.style.display = "none";
        logoVirtu.style.height = "55px";
        logoVirtu.style.paddingTop = "5px";
        hamburguerIcon.style.display = "block";
        navbarImg.style.paddingLeft = "0";
        navbarText.style.display = "none";
        navbarFlex.style.justifyContent = "space-between";
        navbar.style.backgroundColor = "#1B1B1B";
        navbarOpcoes.style.display = "none";
        lastNumber = 3;
    } else if (lastNumber != 4 && scroll < 10 && w >= 600 && w < 850) {
        logoVirtu.style.height = "110px";
        navbarImg.style.padding = "0";
        navbarText.style.display = "block";
        logoVirtu.style.paddingTop = "20px";
        logoVirtu.style.paddingLeft = "0";
        navbar.style.backgroundColor = "transparent";
        navbarFlex.style.justifyContent = "center";
        hamburguerIcon.style.display = "none";
        navbarOpcoes.style.display = "none";
        lastNumber = 4;
    } else if (lastNumber != 5 && scroll < 10 && w < 600){
        logoVirtu.style.height = "80px";
        navbarImg.style.padding = "0";
        navbarText.style.display = "block";
        logoVirtu.style.paddingTop = "10px";
        logoVirtu.style.paddingLeft = "0";
        navbar.style.backgroundColor = "transparent";
        navbarFlex.style.justifyContent = "center"
        navbarOpcoes.style.display = "none";
        hamburguerIcon.style.display = "none";
        lastNumber = 5;
    }

    if (w > 850) {
        navbarHeight = 74;
        scroll = parseInt(scroll) + navbarHeight + 2;
        if (scroll < bannerHeight) {
            navServico.removeAttr('style'); //Tira formatação do servico
            navSobenos.removeAttr('style'); //Tira formatação do sobrenos
            navDepoimento.removeAttr('style'); //Tira formatação do depoimento
            navContatos.removeAttr('style'); //Tira formatação do contato
        } else if (scroll >= bannerHeight && scroll < servicoHeight) {
            navSobenos.removeAttr('style'); //Tira formatação do sobrenos
            navDepoimento.removeAttr('style'); //Tira formatação do depoimento
            navContatos.removeAttr('style'); //Tira formatação do contato
            document.getElementById('navbar-a-servico').style.color = "#BF3B3A";
        } else if (scroll >= servicoHeight && scroll < sobrenosHeight) {
            navServico.removeAttr('style'); //Tira formatação do servico
            navDepoimento.removeAttr('style'); //Tira formatação do depoimento
            navContatos.removeAttr('style'); //Tira formatação do contato
            document.getElementById('navbar-a-sobrenos').style.color = "#BF3B3A";
        } else if (scroll >= sobrenosHeight && scroll < depoimentosHeight) {
            navServico.removeAttr('style'); //Tira formatação do servico
            navSobenos.removeAttr('style'); //Tira formatação do sobrenos
            navContatos.removeAttr('style'); //Tira formatação do contato
            document.getElementById('navbar-a-depoimentos').style.color = "#BF3B3A";
        } else {
            navServico.removeAttr('style'); //Tira formatação do servico
            navSobenos.removeAttr('style'); //Tira formatação do sobrenos
            navDepoimento.removeAttr('style'); //Tira formatação do depoimento
            document.getElementById('navbar-a-contatos').style.color = "#BF3B3A";
        }
    } else {
        navbarHeight = 63;
    }

}

$(window).resize(function () {
    bannerHeight = $('#banner').height();
    servicoHeight = $('#servico').height() + bannerHeight;
    sobrenosHeight = $('#sobre-nos').height() + servicoHeight;
    depoimentosHeight = $('#depoimentos').height() + sobrenosHeight;
    contatosHight = $('#contatos').height() + depoimentosHeight;
});

function pegarHttp(successo) { // função standard de request http

    var http = new XMLHttpRequest();

    // a parte 'alt=json' eh da API do google que transforma a planilha num JSON
    var url = 'https://spreadsheets.google.com/feeds/list/1YXei8y2HJYWkfBE39WSoGcgS0YanFCUyqx9zr_EysFM/od6/public/values?alt=json';
    
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
        infinite: false,
        arrows: true, // utiliza as setas do próprio slick
        dots: true, // bolinhas indicando em que slide o user está
        draggable: false,
        infinite: false,
        focusOnSelect: false, // realce feito com css
        dotsClass: 'slick-dots dots-css', // opção para estilizar as bolinhas do slick
        draggable: false, // desabilita o carrossel arrastável
        responsive: [ // reajuste do slick de acordo com a max-width
            {
                // mostra e passa 2 por vez quando a width eh menor que 1024
                breakpoint: 1024,
                settings: {
                    draggable: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                // mostra e passa 1 por vez quando a width eh menor que 720
                breakpoint: 720,
                settings: {
                    draggable: true,                    
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    bannerHeight = $('#banner').height();
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
        arrows: true, // setas laterais escondidas
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
    var dist = ($('#contatos').offset().top - $(window).scrollTop()) / 2;
    $('html, body').animate({
        scrollTop: $('#contatos').offset().top - navbarHeight + 10
    }, Math.abs(dist));
}

