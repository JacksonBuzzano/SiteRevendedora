$(function(){

    var currentValue = 0;
    var isDrag = false;
    var preco_maximo = 100000;
    var preco_atual = 0;

//Movendo a barra de pesquisa de preço
    $('.pointer-barra').mousedown(function(){
        isDrag = true;
    })

    $(document).mouseup(function(){
        isDrag = false;
    })

    $('.barra-preco').mousemove(function(e){
        if(isDrag == true){
            var elBase = $(this);
            var mouseX = e.pageX - elBase.offset().left;
            if(mouseX < 0)
            mouseX = 0;
            if(mouseX > elBase.width())
                mouseX = elBase.width();

                $('.pointer-barra').css('left',(mouseX-13)+'px');
                currentValue  = (mouseX / elBase.width()) * 100;
                $('.barra-preco-fill').css('width',currentValue+'%');
//Ajustar o preço formatar
                preco_atual = (currentValue/100) * preco_maximo;
                preco_atual = formatarPreco(preco_atual);
                $('.preco_pesquisa').html('R$'+preco_atual);
        } 
    })
//Ajustando o preço nas casas decimal
    function formatarPreco(preco_atual){
        preco_atual = preco_atual.toFixed(2);
        preco_arr = preco_atual.split('.');
        var novo_preco = formatarTotal(preco_arr);
        return novo_preco;
    }

    function formatarTotal(preco_arr){
        if(preco_arr[0] < 1000){
            return  preco_arr[0]+','+preco_arr[1];
        }else if(preco_arr[0] < 10000){
            return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].length)+',',preco_arr[1];
        }else{
            return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+','+preco_arr[1];
        } 
    }

    //Slider da tela sobre venda do carro
    var imgShow = 3;
    var maxIndex = Math.ceil($('.mini-foto').length/3) - 1;
    var curIndex = 0;

    initSlider();
    navigateSlider();
    clickSlider();
    function initSlider(){
        var amt = $('.mini-foto').length * 33.3;
        var elScroll = $('.nav-galeria-wraper');
        var elSingle = $('.mini-foto');
        elScroll.css('width',amt+'%');
        elSingle.css('width',33.3*(100/amt)+'%');
    }
    function navigateSlider(){
        $('.arrow-right-nav').click(function(){
            if(curIndex < maxIndex){
                curIndex++;
                var elOff = $('.mini-foto').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            }else{
                //console.log("CHEGAMOS ATE AQUI")
            }
        });
        $('.arrow-left-nav').click(function(){
            if(curIndex > 0){
                curIndex--;
                var elOff = $('.mini-foto').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            }else{
                //console.log("CHEGAMOS ATE AQUI")
            }
        });
    }
    function clickSlider(){
        $('.mini-img').click(function(){
            $('.mini-img').css('background-color','transparent');
            $(this).css('background-color','rgb(210,210,210)');
            var img = $(this).children().css('background-image');
            $('.foto-destaque').css('background-image',img);
        })
        $('.mini-foto').eq(0).click();
    }
//Clicar e ir para contato base no atributo goto
    $('[goto=contato]').click(function(){
        $('[goto=contato]').css('color','red');
        $('footer nav a').css('color', 'white');
        $('header nav a').css('color','black');
        $('html,body').animate({'scrollTop':$('#contato').offset().top});
        return false;
    })

    //sistema de navegação do depoimento da index html
    var amtDepoimento = $('.depoimento-single p').length;
    var curIndext = 0;
    iniciarDepoimento();
    navegarDepoimentos();

    function iniciarDepoimento(){
        $('.depoimento-single p').hide();
        $('.depoimento-single p').eq(0).show();
    }

    function navegarDepoimentos(){
        $('[next]').click(function(){
            curIndex++;
            if(curIndex >=amtDepoimento)
            curIndex = 0;
            $('.depoimento-single p').hide();
            $('.depoimento-single p').eq(curIndex).show();
        })

        $('[prev]').click(function(){
            curIndex--;
            if(curIndex < 0)
            curIndex = amtDepoimento-1;
            $('.depoimento-single p').hide();
            $('.depoimento-single p').eq(curIndex).show();
        })
    }
})