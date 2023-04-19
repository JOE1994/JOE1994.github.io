## PIC (Position-Independent-Code) , PIE

## Why use `dlopen`
* https://www.mailerq.com/blog/good-reasons-to-use-dlopen

## Interval Arithmetic
* https://en.wikipedia.org/wiki/Interval_arithmetic
* GNU MPFR, GNU MPFI
* http://perso.ens-lyon.fr/nathalie.revol/software.html

## ARM SVE Learning Resources
* https://www.youtube.com/watch?v=eGCcPo4UAHs
* https://gitlab.com/arm-hpc/training/arm-sve-tools

## Random crashes from running single-threaded compiler
* Write experience from fixing memory bug at my job
* Random crashes weren't caused by data races in a multi-thread context.
* Compiler was doing `**('std::end' of heap allocated object)`.
  Random failure occurred only when the `*(std::end of heap allocated object)` was nullptr.
* Dereferencing invalid heap memory was the source of non-deterministic behavior.

## What additional changes are needed in LLVM fork used by Rustc, compared to upstream LLVM ?
