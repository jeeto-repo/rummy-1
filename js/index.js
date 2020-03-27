$(function () {
    window.onscroll = function () {
        var scrTop = (document.body.scrollTop || document.documentElement.scrollTop);
        var formHeight = document.getElementById("box").offsetHeight;
        if (scrTop >= 300) {
            $('.download-option-item').addClass('header-mid-visible').removeClass('header-mid-hidden');
        } else {
            // 隐藏
            $('.download-option-item').addClass('header-mid-hidden').removeClass('header-mid-visible');
        }
        if (scrTop >= formHeight) {
            $('.download-app-footer').fadeIn();
        } else {
            // 隐藏
            $('.download-app-footer').fadeOut();
        }
    }

    $(".live-info-tabs .live-info-tab").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        $(".live-info-tab-details").eq($(this).index()).show().siblings().hide();
    })
    $(".tab-pills .tab-pill").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        $(".rummy-games").eq($(this).index()).addClass("selected").siblings().removeClass("selected");

    })
    $(".tabs").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(this).next().show().siblings('.tab-content').hide();
    })
    var u = navigator.userAgent;
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
        $(".ios-download-btn").show();
        $(".android-download-btn").hide();
    } else if (isAndroid) {
        $(".android-download-btn").show();
        $(".ios-download-btn").hide();
    }
    $("#getTopLink").click(function () {
        var num = $(".mobile-number-input").val();
        if (!num || num.length != 10) {
            $(".error-box").fadeIn();
            return false;
        } else {
            var number = '91' + num;
            sendAjax(number,'getTopLink',num);
        }
    })

    $("#getLink").click(function () {
        var num = $(".login-input").val();
        if (!num || num.length != 10) {
            $(".alert").fadeIn();
            $(".otp-msg").hide();
            return false
        } else {
            var number = '91' + num;
            sendAjax(number,'getLink',num);
        }
    })

    function sendAjax(number,getLink,num) {
        $.ajax({
            url: "https://www.jeetorummy.com/user/get-link",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true,//请求是否异步，默认为异步，这也是ajax重要特性
            data: { "number": number },    //参数值
            type: "POST",   //请求方式
            beforeSend: function () {
                //请求前的处理
            },
            success: function (req) {
                //请求成功时处理
                if(req.result == 'success'){
                    if(getLink == "getTopLink"){
                        $(".error-box").hide();
                        $(".success-box").show();
                        $("#success-content").html(num);
                        setTimeout(function () {
                            $(".success-box").hide();
                        }, 5000)
                    }else{
                        $(".alert").fadeOut();
                        $(".otp-msg").show();
                        $("#otp-num").html(num);
                        setTimeout(function () {
                            $(".otp-msg").hide();
                        }, 5000)
                    }
                }
            },
            complete: function () {
                //请求完成的处理
            },
            error: function (req) {
                //请求出错处理
                if(getLink == "getTopLink"){
                    $('.error-box').show();
                    $("#errorTipsTop").html(req.result)
                }else{
                    $('.alert').show();
                    $("#errorTips").html(req.result)
                }
                
            }
        });

    }
    // var swiper = new Swiper('.swiper-container', {
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'bullets',
    //         color: '#fff'
    //     },

    //     loop: true,
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },

    // });
})