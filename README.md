# weight-log-parser

prerequisite: simplenote, nodejs

---

# Usage

1. Log your weight @ [Simplenote](https://simplenote.com/)
1. Publish your log (note), then replace `url` with yours.
1. Execute commands below.


## Simplenote log format

```text
몸무게 로그

(* 23:45분 이란 의미는 다음날 아침에 쟀다는 뜻 ㅎㅎ)

## 3월

13 23:31 200.65

14 23:35 200.70
15 22:29 200.90
16 23:05 200.85
17 21:33 200.25
18 23:50 200.90
19 23:20 199.90
20 23:29 199.85

21 22:19 199.50
22 23:29 200.85
23 23:16 199.60
24 23:00 199.60
25 23:41 200.60
26 23:45 199.75
27 21:13 199.80

28 23:45 199.35
29 23:44 199.60
30 22:48 199.80
31 23:45 199.60

## 4월

01 23:45 199.45
02 23:45 199.55
03 23:45 199.25
04 23:59 200.65
05 23:45 198.85
06 23:45 199.60
07 22:40 199.75
08 23:41 199.65
09 23:40 199.55
```

Blank is irrelevant to the result.

---

## Execute node

```bash
npm install
node index.js
```


![screenshot](/screenshot1.png)

