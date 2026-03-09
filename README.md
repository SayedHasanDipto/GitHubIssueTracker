# ⚡ JavaScript — প্রশ্নোত্তর

---

## 1️⃣ `var`, `let`, এবং `const` এর পার্থক্য কী?

| বিষয় | `var` | `let` | `const` |
|---|---|---|---|
| **Scope** | Function scope | Block scope | Block scope |
| **Re-declare** | করা যায় | যায় না | যায় না |
| **Re-assign** | করা যায় | করা যায় | যায় না |
| **Hoisting** | হয় (undefined) | হয় (error) | হয় (error) |

```js
var name = "Rahim";
var name = "Karim"; // কোনো সমস্যা নেই

let age = 25;
age = 30;           // পরিবর্তন করা যাবে
// let age = 35;    // Error! আবার declare করা যাবে না

const PI = 3.14;
// PI = 3.1416;     // Error! const পরিবর্তন করা যায় না
```

> 💡 **সহজ কথা:** আজকাল `var` ব্যবহার না করাই ভালো। সাধারণ ভেরিয়েবলে `let`, আর যা পরিবর্তন হবে না তাতে `const` ব্যবহার করো।

---

## 2️⃣ Spread Operator (`...`) কী?

Spread operator একটি Array বা Object-কে **ছড়িয়ে দেয়** (spread করে)।

```js
//  Array-তে ব্যবহার
const fruits = ["আম", "কলা"];
const moreFruits = [...fruits, "লিচু", "জাম"];
console.log(moreFruits); // ["আম", "কলা", "লিচু", "জাম"]

//  Object-এ ব্যবহার
const user = { name: "Rahim", age: 25 };
const updatedUser = { ...user, city: "Dhaka" };
console.log(updatedUser); // { name: "Rahim", age: 25, city: "Dhaka" }

//  Function-এ ব্যবহার
const numbers = [1, 2, 3];
console.log(Math.max(...numbers)); // 3
```

>  **সহজ কথা:** মনে করো একটা ব্যাগের সব জিনিস বের করে অন্য ব্যাগে রাখছো — এটাই spread operator।

---

## 3️⃣ `map()`, `filter()`, এবং `forEach()` এর পার্থক্য কী?

| Method | কাজ কী? | নতুন Array দেয়? |
|---|---|---|
| `map()` | প্রতিটি element পরিবর্তন করে | হ্যাঁ |
| `filter()` | শর্ত অনুযায়ী element বাছাই করে | হ্যাঁ |
| `forEach()` | শুধু loop করে, কিছু return করে না | না |

```js
const numbers = [1, 2, 3, 4, 5];

// map() — প্রতিটি সংখ্যাকে দ্বিগুণ করো
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter() — শুধু জোড় সংখ্যা রাখো
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// forEach() — শুধু print করো, কিছু return হয় না
numbers.forEach(n => console.log(n)); // 1, 2, 3, 4, 5
```

> 💡 **সহজ কথা:**
> - **map()** → রূপ বদলাও
> - **filter()** → বাছাই করো
> - **forEach()** → শুধু দেখো

---

## 4️⃣ Arrow Function কী?

Arrow function হলো function লেখার একটি **ছোট ও আধুনিক পদ্ধতি**।

```js
//  পুরনো পদ্ধতি (Regular Function)
function add(a, b) {
  return a + b;
}

//  নতুন পদ্ধতি (Arrow Function)
const add = (a, b) => a + b;

console.log(add(3, 5)); // 8

//  একটি parameter হলে bracket লাগে না
const double = n => n * 2;
console.log(double(4)); // 8

//  একাধিক লাইন হলে {} এবং return লাগে
const greet = (name) => {
  const message = `হ্যালো, ${name}!`;
  return message;
};
console.log(greet("Rahim")); // হ্যালো, Rahim!
```

>  **সহজ কথা:** Arrow function মূলত regular function-এর সংক্ষিপ্ত রূপ। কোড কম লিখতে হয়, পড়তেও সহজ।

---

## 5️⃣ Template Literals কী?

Template literals হলো string লেখার আধুনিক পদ্ধতি যেখানে **backtick (`)** ব্যবহার করা হয়।

```js
const name = "Rahim";
const age = 25;

//  পুরনো পদ্ধতি
const old = "আমার নাম " + name + " এবং বয়স " + age + " বছর।";

//  Template Literal পদ্ধতি
const modern = `আমার নাম ${name} এবং বয়স ${age} বছর।`;

console.log(modern); // আমার নাম Rahim এবং বয়স 25 বছর।

//  Multi-line string সহজেই লেখা যায়
const message = `
  প্রিয় ${name},
  তোমাকে স্বাগতম!
  তোমার বয়স ${age} বছর।
`;

//  Expression ব্যবহার করা যায়
console.log(`৫ + ৩ = ${5 + 3}`); // ৫ + ৩ = 8
```

>  **সহজ কথা:** Template literal-এ `${}` এর ভেতরে যেকোনো JavaScript expression লেখা যায়। `+` দিয়ে string জোড়া লাগানোর ঝামেলা নেই।

---
