# DailyPopup
오늘하루 보지않기 레이어 팝업 플러그인

  
### [HTML]

```html
<head>
  <title>Daily popup sample</title>
  <script src="dailyPopupES6.js"></script>
</head>
<body>
  <!-- 생성자 함수 new DailyPopup() 선언시 자동으로 body안에 생성됨 -->
</body>
```

<br/>

### [ JS ] Call the DailyPopup

```js
new DailyPopup({
  type: 'responsive',
  img: ['https://placehold.it/500x600', 'https://placehold.it/200x600'], //[ pc , mobile ]
  link: 'https://www.google.com',
  linkTarget: '_self', // _blank, _top, _self ...
  position: [100, 100], //position 100px 100px
});
```

### [ JS ] Multi Call the DailyPopup

```js
new DailyPopup([
  {
    type: 'pc',
    img: 'https://placehold.it/500x600',
    link: 'https://www.google.com',
    linkTarget: '_blnak',
  },
  {
    type: 'responsive',
    img: ['https://placehold.it/500x600', 'https://placehold.it/500x600'],
    link: 'https://www.google.com',
    linkTarget: '_self',
  },
]);
```
