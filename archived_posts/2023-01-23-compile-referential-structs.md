---
layout: post
title: "Compiling Self-referential Structs"
---

By `"self-referential struct"`, I'm referring to a ***struct type whose type reference graph contains a cycle to itself***.

```cpp
// Example 1
struct Foo {
  Foo *direct;
};

// Example 2
struct B {
  A *indirect;
}
struct A {
  B *indirect;
}
```

When generating type info of such types,
the compiler needs to register the self-referential struct type to the type cache first and then proceed to generate types of the struct's fields recursively.
Otherwise it'll get caught in an infinite loop, traversing the cycle within the type reference graph forever.

I accidentally introduced such a bug to the compiler I work on at my job.
I'm writing this to remind myself to not make such a mistake again 😅
