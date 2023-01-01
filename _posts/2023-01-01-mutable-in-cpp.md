---
layout: post
title: "C++ : mutable"
---

## `mutable` class member variable
Class member variables marked as `mutable` can be updated with a const reference to the class object.
The idea reminds me of the [`"Interior Mutability Pattern"`](https://doc.rust-lang.org/reference/interior-mutability.html) in Rust.

### Use `mutable` to collect runtime data access stats.
```C++
class DataWrapper {
  SuperImportantDataClass data;
  mutable unsigned refCnt = 0; // Track how many times this data is read.
}

void ReadOnlyTask(const DataWrapper &obj) {
  /*
    This function takes const reference of `DataWrapper`.
    Do read-only work with inner data.
  */

  // Update member variable with const reference, thanks to `mutable`.
  obj.refCnt += 1;
}
```
With such use of `mutable`, you can get insight into the data access patterns of your program.
You can also write your code to do useful stuff at runtime according to the data access stats collected at runtime
(e.g. adjust storage locations of a data item depending on its popularity).

### Use `mutable` to implement per-item atomics
```C++
#include <chrono>
#include <mutex>
#include <thread>

class DataWrapper {
  SuperImportantDataClass data;
  mutable std::mutex lock;
}

void ReadOnlyTask(const DataWrapper &obj) {
  std::chrono::milliseconds interval(100);
  while (true) {
    // Can lock `obj.lock` with const reference, thanks to `mutable`.
    if (obj.lock.try_lock()) {
      /*
       Do read-only work with inner data.
      */
    } else {
      std::this_thread::sleep_for(interval);
    }
  }
}
```
Here I used `std::mutex` for convenience, but you can instead add complex mutable state within `DataWrapper` to implement your own locking scheme.
Since `ReadOnlyTask` takes a const reference, it'd be more reasonable to replace `std::mutex` with a reader-writer lock.

Storing `lock` alongside the guarded data takes advantage of cache locality. That's probably why Rust's mutex, `std::sync::Mutex`, encloses the guarded data and is located alongside it.

## `mutable` on lambda

[This stackoverflow Q&A](https://stackoverflow.com/questions/5501959/why-does-c11s-lambda-require-mutable-keyword-for-capture-by-value-by-defau) provides enough context for `mutable` on lambdas.

```C++
// C++ example
#include<string>

void foo() {
  std::string s("Hello World")

  // OK
  [=]() mutable { s.push_back('!') ;}();
  
  // Error: a by-value capture cannot be modified in a non-mutable lambda
  // [=]() { s.push_back('!') ;}();

  // s == "Hello World"
}
```
```Rust
// Imitate above C++ lambda example with Rust closures:
fn foo() {
  let s = String::from("Hello World");
  let s1 = s.clone();

  (move || {
    let mut s = s1; // Move the cloned string to within closure.
    s.push('!');
  })();

  // s == "Hello World"
}
```
