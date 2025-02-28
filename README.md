###프론트엔드 개발자 과제 - 이진아

1. 자신이 개발한 앱에 대한 설명

이 앱은 날짜별로 이벤트를 관리할 수 있는 캘린더 어플리케이션입니다.
사용자는 날짜를 선택하고 해당 날짜에 할 일을 추가, 수정, 삭제, 조회 등 상태를 관리할 수 있습니다.
이벤트는 체크박스로 완료 상태를 확인할 수 있으며, 불필요한 일은 삭제할 수 있습니다.

--------------------------------------------------------------------------------------------------

2. 소스 빌드 및 실행 방법 메뉴얼

#소스 환경
- Node.js 14.x 이상
- npm 6.x 이상
- TypeScript
- Ant Design
- dayjs

#실행 방법
npm run dev
http://localhost:5173

--------------------------------------------------------------------------------------------------

3. 주력으로 사용한 컴포넌트에대한 설명 및 사용 이유 기입

3-1. Ant Design - Calendar
- 캘린더 UI를 제공하며, 날짜별 일정 관리가 가능합니다.

3-2. Ant Design - Modal & Form
- 일정을 추가할떄 Modal 과 Form을 사용하여 제목 입력 및 유효성 검사를 수행합니다.

3-3. Ant Design - Checkbox & DeleteOutlined
- checkbox : 할 일의 완료 상태를 표시할 수 있습니다.
- Delete : 삭제 버튼(휴지통)으로 일정을 제거할 수 있습니다.

3-4. dayjs
- 날짜와 시간을 효율적으로 다루기 위해 사용했습니다.

3-5. React Context API (TodoContext)
- 전역 상태 관리를 위해 사용했습니다.
- useTodo 훅을 사용하여 addTodo, toggleTodo, deleteTodo 등의 함수를 제공했습니다.

--------------------------------------------------------------------------------------------------

4. 백엔드 실행 완료
