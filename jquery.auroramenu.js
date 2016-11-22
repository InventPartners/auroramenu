$(function() {
    

    function setCookie(cname, cvalue, exdays) {
        
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        
    }
    
    function getCookie(cname) {
        
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
        
    }    
    
    function saveMenuState() {
        
        var state = [];
        $('.auroramenu').each(function(k, v) {
            state[k] = [];
            $(this).find('li > ul').each(function(k2, v2) {
                if($(this).is(':visible')) {
                    state[k].push(k2);
                }
            });
        });
        
        setCookie('auroramenu', JSON.stringify(state), 365);
        
    }
    
    function loadMenuState() {
        
        var cookie= getCookie('auroramenu');
        if(!cookie) return; 
        
        var state = JSON.parse(cookie);
        
        var ul;
        $.each(state, function(k, v) {
            $.each(v, function(k2, v2) {
                
                ul =  $('.auroramenu').eq(k).find('li > ul').eq(v2);
                ul.prev('a').addClass('open');
                ul.slideDown();
                
            });    
        });
        
    }
    
    $('.auroramenu > li > a').click(function(e) {
        
        e.preventDefault();
        
        $(this).toggleClass('open');
        
        $(this).next('ul').slideToggle(function() {
            saveMenuState();
        });
        
    });
    
    loadMenuState();
    
});