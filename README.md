## Daily Popup
오늘하루 보지않기 레이어 팝업 플러그인
<br/><br/>
<br/>

### [HTML]

~~~html
    <head>
        <title>Daily popup sample</title>
        <script src="dailyPopup.js"></script>
    </head>
    <body>
        <!-- 생성자 함수 new DailyPopup() 선언시 자동으로 body안에 생성됨 -->
    </body>
~~~
<br/>

### [ JS ] Call the DailyPopup

~~~js
    new DailyPopup({
            type: 'responsive',
            img: ['https://placehold.it/500x600','https://placehold.it/200x600'], //[ pc , mobile ]
            link: 'https://www.google.com',
            linkTarget : '_self', // _blank, _top, _self ...
            position: [100, 100] //position 100px 100px
        });
~~~

### [ JS ] Multi Call the DailyPopup

~~~js
    new DailyPopup([
        {
            type: 'pc',
            img: 'https://placehold.it/500x600',
            link: 'https://www.google.com',
            linkTarget : '_blnak'
        },{
            type: 'responsive',
            img: ['https://placehold.it/500x600','https://placehold.it/500x600'],
            link: 'https://www.google.com',
            linkTarget : '_self'
        }
    ]);
~~~

<br/><br/><br/>
### 개선해야할 점
 1. 디바이스 줄였을때 팝업 크기 버그  
 2. dargEvent 클릭방지  
 3. 팝업 display 효과 js로만 제어 할 수 있도록..


