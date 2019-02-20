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
            type: 'responsive[default value] / pc / mobile',
            img: '이미지경로',
            link: '이미지클릭시 경로',
            linkTarget : '_blnak[default value], _self 등 이미지 타겟'
        });
~~~

### [ JS ] Multi Call the DailyPopup

~~~js
    new DailyPopup([
        {
            type: 'responsive[default value] / pc / mobile',
            img: '이미지경로',
            link: '이미지클릭시 경로',
            linkTarget : '_blnak[default value], _self 등 이미지 타겟'
        },{
            type: 'responsive',
            img: 'https://placehold.it/500x600',
            link: 'https://www.google.com',
            linkTarget : '_self'
        }
    ]);
~~~

<br/><br/><br/>
### 개선해야할 점
 1. type 에 따라 반응형/ pc / 모바일 구현
 2. css 작성쓰..
 3. 이미지 경로 및 링크 유효성검사


