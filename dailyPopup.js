
function DailyPopup(options){
    this.options = null;
    this.default = null;
    this.className = null;
    this.cookieName = null;
    
    this.init(options);
    this.createParentElement();
    this.showEvent();
    this.initOverlay();
}

DailyPopup.prototype = {
    init : function(options){

        this.className = {
            parent : 'daily-popup',
            overlay : 'daily-popup__overlay',
            popup : 'daily-popup__item'
        };

        this.default = {
            type : 'responsive',
            link : '',
            img : null,
            linkType : '_blank',
            position: [10, 10]
        };
        ( options.type === 'responsive' ) ? 
            this.default.img = ['https://placehold.it/500x600', 'https://placehold.it/500x600' ] : 
            this.default.img = 'https://placehold.it/500x600';

        this.options = options;
        this.popup = null;
        this.overlay = null;
        this.popupItems = null;
        this.btnCheck = null;
        this.cookieName = null; 
    },
    //부모 엘리먼트 생성
    createParentElement : function(){
        if(document.getElementById(this.className.parent) == null){
            var parent = document.createElement("div");
            parent.id = this.className.parent;
            document.body.appendChild(parent);
        }
        this.popup = parent;
        this.popup.insertAdjacentHTML('beforeend', '<div class="'+this.className.overlay+'"></div>');
        this.overlay = this.popup.querySelector('.'+this.className.overlay); 
        this.overlay.style.display = 'block';
    },

    //팝업 html 마크업 생성
    createPopup : function(img, link, linkType, idx, typeString,position){
        var popupHtmlStart, 
            popupHtmlmiddle, 
            popupHtmlEnd;
        
        popupHtmlStart = '<div id="daily-popup--'+idx+'" class="'+this.className.popup+' '+typeString+'" style="top:'+position[0]+'px; left:'+position[1]+'px">' +
                        '<div class="daily-popup__content">'+
                        '<a class="daily-popup__link" href="'+link+'" target="'+linkType+'">';
        
        ( typeString === 'is-responsive' ) ?
            popupHtmlmiddle =  '<img class="daily-popup__img daily-popup__img--pc" src="'+ img[0]+'"/><img class="daily-popup__img daily-popup__img--mobile" src="'+img[1]+'"/>' :
            popupHtmlmiddle = '<img class="daily-popup__img" src="'+img+'"/>'; 

        popupHtmlEnd ='</a></div>'+
            '<div class="daily-popup__bottom">' +
                '<label class="daily-popup__checkbox-area">'+
                '<input type="checkbox" id="daily-popup__checkbox'+idx+'" class="daily-popup__checkbox"/> 오늘하루 보지않기</label>' +
                '<button id="daily-popup__close-button'+idx+'" type="button" class="daily-popup__close-button">닫기</button>' +
            '</div></div>';

        this.popup.insertAdjacentHTML('beforeend',popupHtmlStart + popupHtmlmiddle + popupHtmlEnd); 
        this.popupItems = this.popup.querySelectorAll('.'+this.className.popup);
    },
 
    // 팝업 이벤트
    showEvent : function(){
        var thisObj = this;
        if(this.options.constructor === Array){ //두개이상
            this.options.forEach(function(op, i){
                op = thisObj.extendsOptions(thisObj.default, op); // 합치기
                thisObj.createPopup(op.img, op.link, op.linkType, i, thisObj.typeQuarter(op.type), op.position);
            });
        }else if(this.options.constructor === Object){ //하나
            this.options = this.extendsOptions(this.default, this.options);
            this.createPopup(this.options.img, this.options.link, this.options.linkType, 0, this.typeQuarter(this.options.type), op.position);
        }
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

    initOverlay : function(){
        var bool = false;
        var result = [];
        for( el of this.popupItems ){ 
            if(!el.classList.contains('is-pc') ){ result.push(el); }
        }
        for( item of result ){ 
            if(item.style.display == 'block' ){bool = true;} 
        }
        bool == true ? this.overlay.style.display = 'block' : this.overlay.style.display = 'none';
    },

    extendsOptions : function(defaults, options){
        var extended = {};
        var prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) { 
                extended[prop] = defaults[prop]; 
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) { 
                extended[prop] = options[prop]; 
            }
        }
        return extended;
    },

    // 타입 분기
    typeQuarter : function(type){
        if(type){type = type.trim();}
        if(type == undefined || type === 'responsive'){
            return 'is-responsive'; 
        }else if(type === 'pc'){ 
            return 'is-pc'; 
        }else if(type === 'mobile'){ 
            return 'is-mobile'; 
        }else{
            console.error('유효하지 않은 type입니다. ( responsive, pc, mobile ) 중 택하세요.');
            return 'is-responsive';
        }
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
        if( checkbox.checked){ this.setCookie(cookie ,"Y",1); }
        el.style.display = "none";
        this.initOverlay();
    }
}

