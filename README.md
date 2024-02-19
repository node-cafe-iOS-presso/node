# 🤖 나만의 AI, 내가 원하던 이와의 커피챗! Capella

<p align="center">
  <img src="https://github.com/node-cafe-iOS-presso/node/assets/121025796/9f07ddbc-dc57-4bfd-9c9a-a9a34875f68c"/>
</p>

<br>

## 프로젝트 소개

- 가천대학교 IT 개발자 & 스타트업 경력개발방 커뮤니티에서 개최한 "제 2회 와글와글 해커톤"에 참여하여 1박2일 간 개발한 프로젝트입니다.
- 나에게 맞는 AI와 직접 대화하며 대화의 부재와 관계적 피곤함을 모두 해결할 수 있는 프로덕트입니다.
- 자신의 호기심과 상상력을 담은 AI를 직접 커스텀하고 경험함으로써 새로운 니즈를 만족시키고 의미 있는 연결을 이룹니다.

<br/>

## 팀원 구성

| <img src="https://avatars.githubusercontent.com/u/121025796?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/110837337?v=4" width="150" height="150"/> |
| :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
|                  이강욱<br/>[@iamkanguk97](https://github.com/iamkanguk97)                  |                    이한슬<br/>[@hanseul37](https://github.com/hanseul37)                    |

<br/>

## 개발 환경

- Backend: NestJS, MySQL, TypeORM
- Infra: AWS EC2, RDS
- 버전관리: GitHub
- 협업: Notion
- 디자인: Figma
- 외부 API: ChatGPT API (GPT-3.5-Turbo)

<br/>

## 브랜치 전략

- main, dev, feature 브랜치를 사용했습니다.
- main은 배포 단계에서만 활용한 branch이고, dev는 개발 단계에서 작업한 branch입니다. 그리고 feature 브랜치는 기능 단위로 사용하였습니다.

<br/>

## 프로젝트 구조

```
📦
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ README.md
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ src
│  ├─ api
│  │  ├─ chat
│  │  │  ├─ chat.controller.spec.ts
│  │  │  ├─ chat.controller.ts
│  │  │  ├─ chat.module.ts
│  │  │  ├─ chat.service.spec.ts
│  │  │  ├─ chat.service.ts
│  │  │  ├─ dto
│  │  │  │  ├─ create-chat-room.dto.ts
│  │  │  │  ├─ create-chat.dto.ts
│  │  │  │  └─ post-chat-message.dto.ts
│  │  │  └─ entities
│  │  │     ├─ chat-room.entity.ts
│  │  │     └─ chat.entity.ts
│  │  ├─ chatgpt
│  │  │  ├─ chatgpt.module.ts
│  │  │  └─ chatgpt.service.ts
│  │  ├─ model
│  │  │  ├─ dto
│  │  │  │  └─ create-model.dto.ts
│  │  │  ├─ entities
│  │  │  │  └─ model.entity.ts
│  │  │  ├─ model.controller.spec.ts
│  │  │  ├─ model.controller.ts
│  │  │  ├─ model.module.ts
│  │  │  ├─ model.service.spec.ts
│  │  │  ├─ model.service.ts
│  │  │  └─ types
│  │  │     └─ index.ts
│  │  └─ user
│  │     ├─ dto
│  │     │  ├─ create-user.dto.ts
│  │     │  └─ update-user.dto.ts
│  │     ├─ entities
│  │     │  └─ user.entity.ts
│  │     ├─ user.controller.spec.ts
│  │     ├─ user.controller.ts
│  │     ├─ user.module.ts
│  │     ├─ user.service.spec.ts
│  │     └─ user.service.ts
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ decorators
│  │  └─ user-token.decorator.ts
│  └─ main.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
├─ tsconfig.json
└─ webpack-hmr.config.js
```

<br/>

## DB 테이블 구조

<img width="1151" alt="Untitled" src="https://github.com/node-cafe-iOS-presso/node/assets/121025796/c59e1c7f-43d3-454f-a7bc-b7bb173b4bae">

<br/>

## 역할 분담

### 이강욱

- 사용자가 설정한 옵션에 따른 커스텀 AI 모델 구축
- 채팅 관련 기능 (채팅 전송, 채팅 목록)

### 이한슬

- 사용자 관련 기능 (로그인 등)
- 홈화면 조회 기능 (사용자가 최근에 사용한 모델 리스트 등)

<br/>

## 기능 리스트

추후 업데이트 예정

<br/>

## 기타 링크

- [[회고] 제 2회 가천대학교 와글와글 해커톤 참여 후기](https://dev-iamkanguk.tistory.com/entry/%ED%9A%8C%EA%B3%A0-%EC%A0%9C-2%ED%9A%8C-%EA%B0%80%EC%B2%9C%EB%8C%80%ED%95%99%EA%B5%90-%EC%99%80%EA%B8%80%EC%99%80%EA%B8%80-%ED%95%B4%EC%BB%A4%ED%86%A4-%EC%B0%B8%EC%97%AC-%ED%9B%84%EA%B8%B0)
- [발표자료 및 시연영상](https://drive.google.com/drive/folders/11OPHXpnf3bhppbVZPwdAUmnXfIMlbi3y)
