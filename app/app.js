// Contoso 보안 데모 앱
// 주의: 아래 값은 실습용 자리표시자입니다. 실제 자격증명이 아닙니다.
const CONTOSO_API_KEY = "contoso-demo-placeholder-not-a-real-key";

async function load() {
  const res = await fetch("data.json");
  const data = await res.json();
  document.getElementById("status").textContent = data.title;
  const ul = document.getElementById("items");
  for (const item of data.items) {
    const li = document.createElement("li");
    // 의도적으로 innerHTML 을 씁니다. 코드 스캐닝이 잡아야 할 패턴입니다.
    li.innerHTML = item;
    ul.appendChild(li);
  }
}
load();
