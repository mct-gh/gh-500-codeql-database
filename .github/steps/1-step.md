## 1단계 · 데이터베이스를 직접 만든다

CodeQL 은 소스를 바로 읽지 않습니다. 먼저 **관계형 데이터베이스**로 바꿉니다.

### 할 일

`.github/workflows/codeql-db.yml` 을 만들고 아래 내용을 넣으세요.

```yaml
name: Build CodeQL database

on:
  workflow_dispatch:

jobs:
  build-db:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v5
      - name: Create database
        run: |
          codeql database create contoso-db \
            --language=javascript-typescript \
            --source-root=.
      - name: Show database size
        run: du -sh contoso-db
```

만든 뒤 **Actions → Build CodeQL database → Run workflow** 로 실행하세요.

### 왜 이렇게 하나

`codeql database create` 는 GitHub 호스티드 러너에 이미 설치돼 있습니다. 따로 설치하지 않아도 됩니다.

`--language` 를 틀리면 데이터베이스가 비어서 만들어집니다. 에러가 아니라 **빈 결과**로 나옵니다.
그래서 조회 결과가 0건일 때 "취약점이 없다"고 착각하기 쉽습니다. 항상 데이터베이스 크기를 먼저 보세요.

컴파일 언어(Java, C#, C++)는 여기에 빌드 명령이 더 필요합니다. 자바스크립트는 필요 없습니다.
이 차이가 시험에 나옵니다.
