
function DailyPopup(options){
    this.className = null;
    this.options = null;
    this.cookieName = null;
    
    this.init(options);
    this.createParentElement();
    this.showEvent();
}

DailyPopup.prototype = {
    init : function(options){
        this.parentClassName = 'daily-popup';
        this.options = options;
        this.popup = null;
        this.btnCheck = null;
        this.cookieName = null; 
    },
    //부모 엘리먼트 생성
    createParentElement : function(){
        if(document.getElementById(this.parentClassName) == null){
            var parent = document.createElement("div");
            parent.id = this.parentClassName;
            document.body.appendChild(parent);
        }
        this.popup = parent;
    },
    //팝업 html 마크업 생성
    createPopup : function(img, link, idx){
        var popupHtml = '<div id="daily-popup--'+idx+'" class="daily-popup__item">' +
                            '<div class="daily-popup__content">'+
                                '<a class="daily-popup__link" href="'+link+'"><img src="'+img+'" /></a>' +
                            '</div>'+
                            '<div class="daily-popup__bottom">' +
                                '<label class="daily-popup__checkbox-area"><input type="checkbox" id="daily-popup__checkbox'+idx+'" class="daily-popup__checkbox"/> 오늘하루 보지않기</label>' +
                                '<button id="daily-popup__close-button'+idx+'" type="button" class="daily-popup__close-button">닫기</button>' +
                            '</div>' +
                        '</div>';
        this.popup.insertAdjacentHTML('beforeend',popupHtml); 
    },
    // 팝업 이벤트
    showEvent : function(){
        var thisObj = this;
        this.options.forEach(function(el, i){
            thisObj.createPopup(el.img, el.link, i);
        });
        //쿠기생성 밑 쿠키 가져오기
        var thisPopup = Array.prototype.slice.call(thisObj.popup.querySelectorAll('.daily-popup__item'));
        thisPopup.forEach(function(el, i){
            thisObj.btnClose = el.querySelector('.daily-popup__close-button');
            thisObj.cookieName = 'pop'+ '__' + el.id + '.' + el.getAttribute('class') + 'pop' + i;  
            thisObj.btnCheck = el.querySelector('.daily-popup__checkbox');
            thisObj.getCookie(thisObj.cookieName);
            thisObj.eventCookie(el, thisObj.cookieName, thisObj.btnClose, thisObj.btnCheck);
        });
    },
    eventCookie : function(el, cookie, btnClose, checkbox){
        var objThis = this;
        var cookiedata = document.cookie;
        if(cookiedata.indexOf(cookie + "=Y")<0){
            el.style.display = 'block';
        }else{
            el.style.display = 'none';
        }
        btnClose.addEventListener('click',function(){
            objThis.closePopup(el, cookie, checkbox);
        });
    },
    //쿠키 가져오기
    getCookie : function(cookieName){
        var name = cookieName + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
        }
        return "";
    },
    //쿠키 설정하기
    setCookie : function(cookieName, cookieValue, exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + "; " + expires;
        console.log(document.cookie);
    },
   //팝업닫기 
    closePopup : function(el, cookie, checkbox){
        if( checkbox.checked){
            this.setCookie(cookie ,"Y",1);
        }
        el.style.display = "none";
    }
}