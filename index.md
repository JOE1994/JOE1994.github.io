---
layout: default
---

# Youngsuk Kim (김영석)

## Work History
* Systems Software Engineer 2 @ Hewlett Packard Enterprise (Sep 2021 - Now)
* Clang/LLVM Compiler Intern @ Hewlett Packard Enterprise (May 2021 - Aug 2021)

## Education
* MS Computer Science @ Georgia Tech (Aug 2018 - Aug 2021)
* BS Computer Science & Engineering @ Korea University (Mar 2014 - Feb 2018)

## Publications
* [Bae, Y., ***`Kim, Y.`***, Askar, A., Lim, J., & Kim, T. (2021, October). Rudra: finding memory safety bugs in rust at the ecosystem scale. In Proceedings of the ACM SIGOPS 28th Symposium on Operating Systems Principles (pp. 84-99).](https://dl.acm.org/doi/10.1145/3477132.3483570)
  * [Rudra](https://github.com/sslab-gatech/Rudra) : memory safety bug finder (compiler plugin)
  * [Rudra-PoC](https://github.com/sslab-gatech/Rudra-PoC) : Collection of open-source Rust bugs discovered by Rudra

## Open-Source Contributions

### ["Writing an OS in Rust"](https://github.com/phil-opp/blog_os/commits?author=JOE1994) Blog (edition-2)
* Authored official Korean translation of chapters 1 ~ 7
* Special thanks to the reviewers! ([@Quqqu](https://github.com/QuqqU) & [@KimWang906](https://github.com/KimWang906) & [@dalinaum](https://github.com/dalinaum) & [@phil-opp](https://github.com/phil-opp))

### [llvm-project](https://github.com/llvm/llvm-project/commits?author=JOE1994)
* Reported & isolated bug: [Clang assertion failure after D139237](https://github.com/llvm/llvm-project/issues/59602)

### [MIRI](https://github.com/rust-lang/miri/commits?author=JOE1994) : Rust MIR Interpreter
* Improved support for running MIRI on Windows
  * [Implement environment variable emulation on Windows](https://github.com/rust-lang/miri/issues/707)
  * [Windows: cannot create Instants](https://github.com/rust-lang/miri/issues/1291)
* Special thanks to [@RalfJung](https://github.com/RalfJung) & [@pvdrz](https://github.com/pvdrz) who were patient enough to bear with me and mentored me through the process!

### [Rust compiler](https://github.com/rust-lang/rust/commits?author=JOE1994)
* Improved support for MIRI (Rust MIR Interpreter)
* Fixed issue: [Invalid JSON for ast-json](https://github.com/rust-lang/rust/issues/71086)
