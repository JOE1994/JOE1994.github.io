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

### [llvm-project](https://github.com/llvm/llvm-project/commits?author=JOE1994)
* `Clang`
  * [Warn unused cxx vardecl which entirely consists condition expr of if/while/for construct](https://github.com/llvm/llvm-project/pull/87348)
  * [Emit warning when a function returns pointer/reference to a struct literal](https://github.com/llvm/llvm-project/pull/83741)
  * [Prevent running duplicate semantic checks on AST](https://github.com/llvm/llvm-project/pull/90625)
* `LLVM`
  * [Opaque pointer](https://llvm.org/docs/OpaquePointers.html) clean-up
    * Remove old APIs which are no longer needed with opaque pointers
    * Remove no-op ptr-to-ptr bitcasts
    * Special thanks to [@nikic](https://github.com/nikic) & [@s-barannikov](https://github.com/s-barannikov) for reviewing my initial commits!
  * [Prevent emitting dead PTX `.reg` variable](https://github.com/llvm/llvm-project/pull/89004)
* [Verify old bugs from LLVM Bugzilla](https://github.com/llvm/llvm-project/issues?q=label%3Abugzilla+commenter%3AJOE1994)

### ["Writing an OS in Rust"](https://github.com/phil-opp/blog_os/commits?author=JOE1994) Blog (edition-2)
* Authored official Korean translation of chapters 1 ~ 7
* Special thanks to the reviewers! ([@Quqqu](https://github.com/QuqqU) & [@KimWang906](https://github.com/KimWang906) & [@dalinaum](https://github.com/dalinaum) & [@phil-opp](https://github.com/phil-opp))

### [MIRI](https://github.com/rust-lang/miri/commits?author=JOE1994) : Rust MIR Interpreter
* Improved support for running MIRI on Windows
  * [Implement environment variable emulation on Windows](https://github.com/rust-lang/miri/issues/707)
  * [Windows: cannot create Instants](https://github.com/rust-lang/miri/issues/1291)
* Special thanks to [@RalfJung](https://github.com/RalfJung) & [@pvdrz](https://github.com/pvdrz) who mentored me through the process!
