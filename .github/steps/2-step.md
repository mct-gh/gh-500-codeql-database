## 2단계 · 쿼리를 직접 쓴다

데이터베이스가 생겼으니 조회할 차례입니다.

### 할 일

파일 두 개를 만드세요.

`queries/qlpack.yml`

```yaml
name: contoso/security-queries
version: 0.0.1
dependencies:
  codeql/javascript-all: "*"
```

`queries/hardcoded-key.ql`

```ql
/**
 * @name Hardcoded configuration key
 * @description 소스에 직접 박아 넣은 설정 키를 찾는다.
 * @kind problem
 * @problem.severity warning
 * @id contoso/hardcoded-key
 */

import javascript

from VariableDeclarator v
where v.getBindingPattern().toString().matches("%KEY%")
select v, "설정 키로 보이는 변수가 소스에 직접 들어 있습니다."
```

### 왜 이렇게 하나

`qlpack.yml` 이 없으면 쿼리가 어떤 라이브러리를 쓰는지 알 수 없어 컴파일에 실패합니다.
쿼리 하나만 덜렁 두면 안 되는 이유입니다.

주석 블록의 `@id` 와 `@kind` 는 장식이 아닙니다.
`@kind problem` 이어야 결과가 코드 스캐닝 알림으로 올라갑니다.
`@id` 는 알림을 구분하는 열쇠라 중복되면 알림이 덮어써집니다.
