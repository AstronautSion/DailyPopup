# DailyPopup

## 오늘하루 보지않기 레이어 팝업 플러그인

<br>
이게 뭐라고 예전에 자주 쓰는 기능이라 의식의 흐름으로 대충 만들어 놓은건데 이걸로 Arctic Code Vault Contributor 가 됐다. <br>
1년 넘게 지나 지금 안 것도 레전드...<br>
1000년간 보관된다는데... 이런 허접한 코드를 왜 보관하는지 기준이 궁금하다.<br>
부끄러우니까 얼른 날 잡아서 손을 봐야겠다...

<br/><br/>
<br/>

### [HTML]

```html
<head>
  <title>Daily popup sample</title>
  <script src="dailyPopup.js"></script>
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
