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

### [ JS ]
~~~js
    new DailyPopup([
        {
            type: 'responsive / pc / mobile',
            img: '이미지경로',
            link: '이미지클릭시 경로'
        },
        {
            type: 'responsive / pc / mobile',
            img: '이미지경로',
            link: '이미지클릭시 경로'
        }
    ]);
~~~

<br/><br/><br/>
### 개선해야할 점
1. responsive 대응 할 수 있도록
2. 인자값이 배열이 아닌 객체로 전달 가능 하도록
~~~js
    // 예시
    new DailyPopup({
        type: 'responsive / pc / mobile',
        img: '이미지경로',
        link: '이미지클릭시 경로'
    });
~~~
3. css 작성쓰..

