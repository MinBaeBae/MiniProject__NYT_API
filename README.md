# React MiniProject

뉴욕타임즈 기사 검색웹을 만드는 프로젝트입니다.

# 기능
### Routing
- "/" url에서는 기사 검색 페이지 렌더한다.
- "/clip" url에서는 내가 clip한 기사 페이지 렌더 그 외 url은 "/"로 redirect

### Input
- 마지막 타이핑 이후 0.5초동안 추가 입력이 없으며 input value가 있는 경우 검색 api 호출한다.
- 최대 5개까지 search history 저장한다. (브라우저 종료해도 지속)
- search history가 존재하고, input에 focus중이면 search history 노출되게 한다.

### News List
- "/" 과 "/clip"은 기사 리스트를 렌더한다.
- 기사 리스트는 다음 내용을 포함하는 기사 카드를 렌더한다.
  - 타이틀
  - 날짜
  - clip하기 버튼(누를 때마다 unclip하기 버튼과 toggle)
  - 자세히보기 버튼(해당 기사 새탭으로 열기)
- infinite scroll (스크롤이 마지막에 닿았을 때 다음 page 요청)
- 첫 페이지가 화면의 높이를 모두 채우지 못한 경우에도 page 요청한다.

### Clip
- 기사 카드의 clip버튼을 클릭하여 해당 기사를 즐겨찾기한다 clip된 기사들은 "/clip"에서 확인할 수 있다.
- clip된 기사들은 브라우저를 재시작하여도 유지된다.
- 기사를 unclip하면 더이상 "/clip"에서 확인할 수 없다.

# 기술 스택
- Javascript
- React
- Styled Components
- React Router
- Axios

# 팀 구성
- 김지수
- 배민성
- 양승철
- 위요섭
- 조연주
- 최우성
