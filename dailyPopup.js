

function DailyPopup(options) {
  this.options = null;
  this.default = null;
  this.className = null;
  this.cookieName = null;
  this.popup = null;
  this.overlay = null;
  this.popupItems = null;
  this.btnCheck = null;

  this._init(options);
  this._createParentElement();
  this._showEvent();
  this._initOverlay();
}

DailyPopup.prototype = {
  _init: function (options) {
    this.className = {
      parent: 'daily-popup',
      overlay: 'daily-popup__overlay',
      popup: 'daily-popup__item',
    };
    this.default = {
      type: 'responsive',
      link: '',
      img: null,
      linkTarget: '_blank',
      position: [10, 10],
    };
    options.type === 'responsive'
      ? (this.default.img = ['http://placehold.it/500x600', 'http://placehold.it/500x600'])
      : (this.default.img = 'http://placehold.it/500x600');

    this.options = options;
  },
  //부모 엘리먼트 생성
  _createParentElement: function () {
    if (document.getElementById(this.className.parent) == null) {
      var parent = document.createElement('div');
      parent.id = this.className.parent;
      document.body.appendChild(parent);
    }
    this.popup = parent;
    this.popup.insertAdjacentHTML('beforeend', '<div class="' + this.className.overlay + '"></div>');
    this.overlay = this.popup.querySelector('.' + this.className.overlay);
    this.overlay.style.display = 'block';
  },
  //팝업 html 마크업 생성
  _createPopup: function (img, link, linkTarget, idx, typeString, position) {
    var popupHtmlStart = null,
      popupHtmlmiddle = null,
      popupHtmlEnd = null;

    popupHtmlStart =
      '<div id="daily-popup--' +
      idx +
      '" class="' +
      this.className.popup +
      ' ' +
      typeString +
      '" style="top:' +
      position[0] +
      'px; left:' +
      position[1] +
      'px">' +
      '<div class="daily-popup__content">' +
      '<a class="daily-popup__link" href="' +
      link +
      '" target="' +
      linkTarget +
      '">';

    typeString === 'is-responsive'
      ? (popupHtmlmiddle =
          '<img class="daily-popup__img daily-popup__img--pc" src="' +img[0]+'"/>'+
          '<img class="daily-popup__img daily-popup__img--mobile" src="'+img[1]+'"/>')
      : (popupHtmlmiddle = '<img class="daily-popup__img" src="' + img + '"/>');

    popupHtmlEnd =
      '</a></div>' +
      '<div class="daily-popup__bottom">' +
      '<label class="daily-popup__checkbox-area">' +
      '<input type="checkbox" id="daily-popup__checkbox' +idx +'" class="daily-popup__checkbox"/> 오늘하루 보지않기</label>' +
      '<button id="daily-popup__close-button' +
      idx +
      '" type="button" class="daily-popup__close-button">닫기</button>' +
      '</div></div>';

    this.popup.insertAdjacentHTML('beforeend', popupHtmlStart + popupHtmlmiddle + popupHtmlEnd);
    this.popupItems = this.popup.querySelectorAll('.' + this.className.popup);

    this._imgSizeConfirm(this.popup.querySelector('#daily-popup--' + idx), typeString);
  },
  // 이미지 사이즈 설정
  _imgSizeConfirm: function (elmnt, typeString) {
    var showImageSize = function (img) {
      var width;
      window.onload = function () {
        if (img.naturalWidth) {
          width = img.naturalWidth;
        } else {
          var tImg = new Image();
          width = tImg.width;
        }
        elmnt.style.width = width + 'px';
      };
    };
    if (typeString === 'is-responsive') {
      showImageSize(elmnt.querySelector('img:nth-child(1)'));
    } else if (typeString === 'is-pc') {
      showImageSize(elmnt.querySelector('img'));
    }
  },
  // 팝업 이벤트
  _showEvent: function () {
    var thisObj = this;
    if (this.options.constructor === Array) {
      //두개이상
      this.options.forEach(function (op, i) {
        op = thisObj._extendsOptions(thisObj.default, op); // 합치기
        thisObj._createPopup(op.img, op.link, op.linkTarget, i, thisObj._typeQuarter(op.type), op.position);
      });
    } else if (this.options.constructor === Object) {
      //하나
      this.options = this._extendsOptions(this.default, this.options);
      this._createPopup(
        this.options.img,
        this.options.link,
        this.options.linkTarget,
        0,
        this._typeQuarter(this.options.type),
        op.position
      );
    }
    //쿠기생성 밑 쿠키 가져오기
    var thisPopup = Array.prototype.slice.call(thisObj.popup.querySelectorAll('.daily-popup__item'));
    thisPopup.forEach(function (el, i) {
      thisObj.btnClose = el.querySelector('.daily-popup__close-button');
      thisObj.cookieName = 'pop' + '__' + el.id + '.' + el.getAttribute('class') + 'pop' + i;
      thisObj.btnCheck = el.querySelector('.daily-popup__checkbox');
      thisObj._getCookie(thisObj.cookieName);
      thisObj._eventCookie(el, thisObj.cookieName, thisObj.btnClose, thisObj.btnCheck);
    });
  },
  // overlay 초기화
  _initOverlay: function () {
    var bool = false;
    var result = [];
    for (el of this.popupItems) {
      if (!el.classList.contains('is-pc')) {
        result.push(el);
      }
    }
    for (item of result) {
      if (item.style.display == 'block') {
        bool = true;
      }
    }
    bool == true ? (this.overlay.style.display = 'block') : (this.overlay.style.display = 'none');
  },
  // 옵션 합치기
  _extendsOptions: function (defaults, options) {
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
  _typeQuarter: function (type) {
    if (type) {
      type = type.trim();
    }
    if (type == undefined || type === 'responsive') {
      return 'is-responsive';
    } else if (type === 'pc') {
      return 'is-pc';
    } else if (type === 'mobile') {
      return 'is-mobile';
    } else {
      console.error('유효하지 않은 type입니다. ( responsive, pc, mobile ) 중 택하세요.');
      return 'is-responsive';
    }
  },
  // 쿠키 이벤트
  _eventCookie: function (el, cookie, btnClose, checkbox) {
    var objThis = this;
    var cookiedata = document.cookie;
    if (cookiedata.indexOf(cookie + '=Y') < 0) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
    btnClose.addEventListener('click', function () {
      objThis._closePopup(el, cookie, checkbox);
      objThis._initOverlay();
    });
  },
  //쿠키 가져오기
  _getCookie: function (cookieName) {
    var name = cookieName + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return '';
  },
  //쿠키 설정하기
  _setCookie: function (cookieName, cookieValue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + '; ' + expires;
    //console.log(document.cookie);
  },
  //팝업닫기
  _closePopup: function (el, cookie, checkbox) {
    if (checkbox.checked) {
      this._setCookie(cookie, 'Y', 1);
    }
    el.style.display = 'none';
  },
  // //drag event
  // dragEvent : function(elmnt, link, linkTarget) {
  //     var linkStatus = false;
  //     var pos1 = 0,
  //         pos2 = 0,
  //         pos3 = 0,
  //         pos4 = 0;

  //     var dragMouseDown = function(e) {
  //         e = e || window.event;
  //         e.preventDefault();
  //         // get the mouse cursor position at startup:
  //         pos3 = e.clientX;
  //         pos4 = e.clientY;
  //         document.onmouseup = closeDragElement;
  //         // call a function whenever the cursor moves:
  //         document.onmousemove = elementDrag;
  //         // linkStatus init
  //         linkStatus = false;
  //         elmnt.querySelector('a').onclick = function(e){
  //             e.preventDefault();
  //         };
  //     };

  //     var elementDrag = function(e) {
  //         e = e || window.event;
  //         e.preventDefault();
  //         linkStatus = true;
  //         // calculate the new cursor position:
  //         pos1 = pos3 - e.clientX;
  //         pos2 = pos4 - e.clientY;
  //         pos3 = e.clientX;
  //         pos4 = e.clientY;
  //         // set the element's new position:
  //         elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
  //         elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  //     };

  //     var closeDragElement = function(e) {
  //         // stop moving when mouse button is released:
  //         document.onmouseup = null;
  //         document.onmousemove = null;

  //         if(linkStatus == false){
  //             if(linkTarget == '_blank'){ window.open(link);}
  //             else{ window.location.href = link; }
  //         }
  //     };

  //     elmnt.onmousedown = dragMouseDown;
  // },
};
