# 🎸 MUSAI : 악기 대여부터 구매까지 ONE STOP

<img width="1920" alt="KakaoTalk_20250118_120517793" src="https://github.com/user-attachments/assets/13dfea09-43ef-4f05-ac9b-763ec8beea1c" />

![서비스개요2](https://github.com/user-attachments/assets/089cf8bd-b704-4d39-a5de-c27473e76d23)


(배포 링크)

## 1️⃣ Member

|<img src="https://github.com/jsomnium.png" width="250" height="250"/>|<img src="https://avatars.githubusercontent.com/u/72486764?v=4.png" width="250" height="250"/>|
|:---:|:---:|
|[Jisu]()|[yyj0917](https://github.com/yyj0917)|
|제품 상세 페이지, 시연&대여 예약|로그인, 홈, 좋아요, 마이페이지|

## 2️⃣ 주요 기능

### 홈 - 세부 필터를 통한 제품, 매장 탐색
<img width="1920" alt="0-홈에서 제품 탐색" src="https://github.com/user-attachments/assets/bae906f2-33e8-4745-b601-47886f65d558" />

![2-매장과제품탐색](https://github.com/user-attachments/assets/da0d9464-54d4-41ae-acbf-cbddb95f262a)

### 검색 - 검색 기능을 통해 특정 제품 서칭

![1-검색](https://github.com/user-attachments/assets/0476c0a6-0ed1-4dd6-8b5b-f0f0ee81f8a2)

### 예약 - 매장 일정에 따라 시연,대여 예약 후 탭에서 예약 관리
<img width="1920" alt="3-대여" src="https://github.com/user-attachments/assets/43f27b88-b4ee-470a-97ae-97ec12d61224" />

![4-예약확인](https://github.com/user-attachments/assets/a13cfb6c-ca85-4330-9064-03529c882a30)

### 마이페이지 - 로그인 후 '좋아요' 모아보기, 예약 내역 확인

![6-좋아요](https://github.com/user-attachments/assets/b19292c6-4eb6-440d-a318-93807cc75f69)

![5-로그인](https://github.com/user-attachments/assets/fd061c5a-de3a-47e1-89d4-f9840b8221dc)


## 3️⃣ 기술 스택 & 선정 이유 
- Next.js - 14.2.5
  - 초기 화면에 상품과 아티클 이미지를 주로 보여주고, 검색엔진에 잦은 노출이 필요한 커머스 서비스 특성을 고려하여 SSR을 통해 초기 렌더링 속도완화와 SEO최적화 및 next/image 이미지 최적화를 할 수 있는 Next.js 14.2.5 App Routing을 기술 스택으로 선정
- TypeScript
  - 다양한 상품 및 좋아요 등의 변수, 데이터가 많아서 타입을 지정하여 명확한 데이터 구조를 정의하고, 협업 시 코드 이해를 돕기 위해 선정
- Axios
  - async/await 비동기 통신을 활용하여 여러 API 호출 작업을 처리하기 위한 통신 방법으로 선정
- Zustand
  - AccessToken 메모리 관리, Filter, Modal 등의 상태를 전역적으로 관리하기 위해 선정. 특히, 전역적으로 관리할 상태가 복잡하지 않기 때문에 보일러 플레이트가 적고, 경량 상태 관리를 위해 Zustand로 선택.
- Tanstack Query
  - 상품, 이미지, 데이터 등의 렌더링 속도가 중요한 서비스이기 때문에 클라이언트 단에서 캐싱을 통해 반복적인 렌더링 속도를 완화하기 위해 선정
- TailwindCss
  - Purge CSS 특성으로 CSS bundle을 줄여주고, JIT Compiler로 Next.js Local 개발환경에서 빠른 수정이 가능하면서 유틸리티 클래스 활용 및 협업 시 컴포넌트 CSS 공유가 용이하여 선정


## 4️⃣ 디렉터리 구조

app -> app routing을 사용하기 위해 각 route link를 폴더명으로 하여 page.tsx를 생성. 또한 각 페이지에서 활용하는 컴포넌트는 _components 폴더를 생성하여 관리.

components -> modal, providers, ui(shadcn-ui), 기타 공용 컴포넌트 => 여러 페이지 공용으로 사용하는 Component는 src루트에 따로 관리

hooks -> use Custom hook을 관리

lib -> api, tanstack, utils(util 함수), zustand로 여러 라이브러리 및 api 로직, util 함수를 관리

skeleton -> lazy loading 시에 UI로 활용할 Skeleton Code

types -> product, article type과 같은 데이터들의 타입을 관리

middleware.ts -> Next.js 자체의 middleware로 서버와 클라이언트 사이의 중간과정 처리

## 5️⃣ 상태 관리 방식

- Zustand
  -> accessToken을 상태관리 메모리로 관리하고, 새로고침 시 refreshToken을 활용한 accessToken 재발급으로 토큰 및 로그인 상태를 관리함. 추가적으로 전역적으로 사용되는 filter, modal, custom-header 등의 상태를 store를 통해 관리.

- TanStack Query
   -> 회원정보, 상품정보, 아티클정보 등의 캐싱이 필요한 데이터들은 useQuery를 통해 적절한 기준으로 캐싱하여 데이터를 관리.

- 이외의 각 컴포넌트에 필요한 상태는 useState로 관리.
