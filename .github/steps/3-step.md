## 3단계 · 커스텀 쿼리를 스캔에 연결한다

쿼리를 썼으니 실제 스캔이 그것을 쓰게 만들어야 합니다.

### 할 일

`.github/workflows/codeql.yml` 을 만들고 `queries` 옵션으로 우리 쿼리 폴더를 가리키세요.

```yaml
name: CodeQL

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      contents: read
    steps:
      - uses: actions/checkout@v5
      - uses: github/codeql-action/init@v3
        with:
          languages: javascript-typescript
          queries: security-extended,./queries
      - uses: github/codeql-action/analyze@v3
```

### 왜 이렇게 하나

`queries` 는 쉼표로 여러 개를 겹쳐 쓸 수 있습니다.
`security-extended` 는 GitHub 이 만든 확장 쿼리 묶음이고, `./queries` 는 우리가 쓴 것입니다.

여기서 자주 하는 실수 하나. **기본 설정(default setup)을 켠 채로 이 워크플로를 추가하면 충돌합니다.**
같은 저장소에서 둘 다 돌면 알림이 중복되거나 하나가 무시됩니다.
커스텀 쿼리를 쓰려면 고급 설정(advanced setup)으로 전환해야 합니다.
