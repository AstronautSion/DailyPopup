
class DailyPopup {
  constructor(options){
    this.options = options;
    this.default = null;
    this.className = null;
    this.cookieName = null;
    this.popup = null;
    this.overlay = null;
    this.popupItems = null;
    this.btnCheck = null;

    this._init();
    this._createParentElement();
    this._showEvent();
    this._initOverlay();
  }

  _init() {
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
    this.options.type === 'responsive'
      ? (this.default.img = ['http://placehold.it/500x600', 'http://placehold.it/500x600'])
      : (this.default.img = 'http://placehold.it/500x600');
  }
  //부모 엘리먼트 생성
  _createParentElement() {
    if (document.getElementById(this.className.parent) == null) {
      const parent = document.createElement('div');
      parent.id = this.className.parent;
      document.body.appendChild(parent);
    }
    this.popup = document.getElementById(this.className.parent);
    this.popup.insertAdjacentHTML('beforeend', `<div class="${this.className.overlay}"></div>`);
    this.overlay = this.popup.querySelector(`.${this.className.overlay}`);
    this.overlay.style.display = 'block';
  }

  //팝업 html 마크업 생성
  _createPopup(img, link, linkTarget, idx, typeString, position) {
    let popupHtmlStart = null,
        popupHtmlmiddle = null,
        popupHtmlEnd = null;
    popupHtmlStart = `
      <div 
        id="daily-popup--${idx}" 
        class="${this.className.popup} ${typeString}"
        style="top:${position[0]}px; left:${position[1]}px"
      >
      <div class="daily-popup__content">
        <a class="daily-popup__link" href="${link}" target="${linkTarget}">
    `;
       
    typeString === 'is-responsive'
      ? (popupHtmlmiddle = `
          <img class="daily-popup__img daily-popup__img--pc" src="${img[0]}" />
          <img class="daily-popup__img daily-popup__img--mobile" src="${img[1]}" />`)
      : (popupHtmlmiddle = `<img class="daily-popup__img" src="${img}"/>`);

    popupHtmlEnd =`</a></div>
      <div class="daily-popup__bottom">
        <label class="daily-popup__checkbox-area">
        <input type="checkbox" id="daily-popup__checkbox${idx}" class="daily-popup__checkbox"/> 오늘하루 보지않기</label>
        <button id="daily-popup__close-button${idx}" type="button" class="daily-popup__close-button">닫기</button>
      </div></div>`;
      
    this.popup.insertAdjacentHTML('beforeend', popupHtmlStart + popupHtmlmiddle + popupHtmlEnd);
    this.popupItems = this.popup.querySelectorAll('.' + this.className.popup);

    this._imgSizeConfirm(this.popup.querySelector('#daily-popup--' + idx), typeString);
  }
  // 이미지 사이즈 설정
  _imgSizeConfirm(element, typeString) {
    let showImageSize = function (img) {
      let width;
      window.onload = function () {
        if (img.naturalWidth) {
          width = img.naturalWidth;
        } else {
          let tImg = new Image();
          width = tImg.width;
        }
        element.style.width = width + 'px';
      };
    };
    if (typeString === 'is-responsive') {
      showImageSize(element.querySelector('img:nth-child(1)'));
    } else if (typeString === 'is-pc') {
      showImageSize(element.querySelector('img'));
    }
  }

  // 팝업 이벤트
  _showEvent() {
    if (this.options.constructor === Array) {
      //두개이상
      this.options.forEach((op, i) => {
        op = this._extendsOptions(this.default, op); // 합치기
        this._createPopup(op.img, op.link, op.linkTarget, i, this._typeQuarter(op.type), op.position);
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
    let thisPopup = Array.prototype.slice.call(this.popup.querySelectorAll('.daily-popup__item'));
    thisPopup.forEach((el, i) => {
      this.btnClose = el.querySelector('.daily-popup__close-button');
      this.cookieName = `pop__${el.id}.${el.getAttribute('class')}pop${i}`;
      this.btnCheck = el.querySelector('.daily-popup__checkbox');
      this._getCookie(this.cookieName);
      this._eventCookie(el, this.cookieName, this.btnClose, this.btnCheck);
    });
  }

  // overlay 초기화
  _initOverlay() {
    let bool = false;
    let result = [];
    Array.prototype.slice.call(this.popupItems).map(el => {
      if (!el.classList.contains('is-pc')) {
        result.push(el);
      }
    });
    result.map(item => {
      if (item.style.display == 'block') {
        bool = true;
      }
    });
    
    bool == true ? (this.overlay.style.display = 'block') : (this.overlay.style.display = 'none');
  }
  
  // 옵션 합치기
  _extendsOptions(defaults, options) {
    let extended = {};
    let prop;
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
  }

  // 타입 분기
  _typeQuarter(type) {
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
  }
  // 쿠키 이벤트
  _eventCookie (el, cookie, btnClose, checkbox) {
    let objThis = this;
    let cookiedata = document.cookie;
    if (cookiedata.indexOf(cookie + '=Y') < 0) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
    btnClose.addEventListener('click', function () {
      objThis._closePopup(el, cookie, checkbox);
      objThis._initOverlay();
    });
  }
  //쿠키 가져오기
  _getCookie(cookieName) {
    let name = cookieName + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return '';
  }
  //쿠키 설정하기
  _setCookie(cookieName, cookieValue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + '; ' + expires;
  }
  //팝업닫기
  _closePopup(el, cookie, checkbox) {
    if (checkbox.checked) {
      this._setCookie(cookie, 'Y', 1);
    }
    el.style.display = 'none';
  }
  
}
