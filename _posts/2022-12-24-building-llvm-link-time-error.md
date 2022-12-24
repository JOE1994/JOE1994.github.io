---
title: "Link time error when building LLVM"
layout: post
---

### Link time error with `ld`

Lately, LLVM compilation kept failing with [`SIGKILL`](https://www.gnu.org/software/libc/manual/html_node/Termination-Signals.html#index-SIGKILL) at link-time on my machine with 16 GB RAM. This only happened when I'm building LLVM with Debug info.

```bash
# Configure to build in `Debug` mode (results in SIGKILL)
$ cmake -S llvm -B build -G Ninja -DCMAKE_BUILD_TYPE=Debug
$ cmake --build build

# Configure to build in `Release` mode (build success)
$ cmake -S llvm -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
$ cmake --build build
```

* ERROR MESSAGE (SIGKILL)
```
[62/191] Linking CXX executable bin/llvm-debuginfo-analyzer
FAILED: bin/llvm-debuginfo-analyzer 
: && /usr/bin/c++ -fPIC -fno-semantic-interposition -fvisibility-inlines-hidden -Werror=date-time -Wall -Wextra -Wno-unused-parameter -Wwrite-strings -Wcast-qual -Wno-missing-field-initializers -pedantic -Wno-long-long -Wimplicit-fallthrough -Wno-maybe-uninitialized -Wno-class-memaccess -Wno-redundant-move -Wno-pessimizing-move -Wno-noexcept-type -Wdelete-non-virtual-dtor -Wsuggest-override -Wno-comment -Wno-misleading-indentation -Wctad-maybe-unsupported -fdiagnostics-color -g -Wl,-rpath-link,/home/joe/repos/llvm-project/build/./lib tools/llvm-debuginfo-analyzer/CMakeFiles/llvm-debuginfo-analyzer.dir/llvm-debuginfo-analyzer.cpp.o tools/llvm-debuginfo-analyzer/CMakeFiles/llvm-debuginfo-analyzer.dir/Options.cpp.o -o bin/llvm-debuginfo-analyzer  -Wl,-rpath,"\$ORIGIN/../lib"  lib/libLLVMAArch64Desc.a  lib/libLLVMAMDGPUDesc.a  lib/libLLVMARMDesc.a  lib/libLLVMAVRDesc.a  lib/libLLVMBPFDesc.a  lib/libLLVMHexagonDesc.a  lib/libLLVMLanaiDesc.a  lib/libLLVMMipsDesc.a  lib/libLLVMMSP430Desc.a  lib/libLLVMNVPTXDesc.a  lib/libLLVMPowerPCDesc.a  lib/libLLVMRISCVDesc.a  lib/libLLVMSparcDesc.a  lib/libLLVMSystemZDesc.a  lib/libLLVMVEDesc.a  lib/libLLVMWebAssemblyDesc.a  lib/libLLVMX86Desc.a  lib/libLLVMXCoreDesc.a  lib/libLLVMAArch64Info.a  lib/libLLVMAMDGPUInfo.a  lib/libLLVMARMInfo.a  lib/libLLVMAVRInfo.a  lib/libLLVMBPFInfo.a  lib/libLLVMHexagonInfo.a  lib/libLLVMLanaiInfo.a  lib/libLLVMMipsInfo.a  lib/libLLVMMSP430Info.a  lib/libLLVMNVPTXInfo.a  lib/libLLVMPowerPCInfo.a  lib/libLLVMRISCVInfo.a  lib/libLLVMSparcInfo.a  lib/libLLVMSystemZInfo.a  lib/libLLVMVEInfo.a  lib/libLLVMWebAssemblyInfo.a  lib/libLLVMX86Info.a  lib/libLLVMXCoreInfo.a  lib/libLLVMAArch64Disassembler.a  lib/libLLVMAMDGPUDisassembler.a  lib/libLLVMARMDisassembler.a  lib/libLLVMAVRDisassembler.a  lib/libLLVMBPFDisassembler.a  lib/libLLVMHexagonDisassembler.a  lib/libLLVMLanaiDisassembler.a  lib/libLLVMMipsDisassembler.a  lib/libLLVMMSP430Disassembler.a  lib/libLLVMPowerPCDisassembler.a  lib/libLLVMRISCVDisassembler.a  lib/libLLVMSparcDisassembler.a  lib/libLLVMSystemZDisassembler.a  lib/libLLVMVEDisassembler.a  lib/libLLVMWebAssemblyDisassembler.a  lib/libLLVMX86Disassembler.a  lib/libLLVMXCoreDisassembler.a  lib/libLLVMBinaryFormat.a  lib/libLLVMDebugInfoLogicalView.a  lib/libLLVMDebugInfoCodeView.a  lib/libLLVMDebugInfoDWARF.a  lib/libLLVMDebugInfoPDB.a  lib/libLLVMMC.a  lib/libLLVMMCDisassembler.a  lib/libLLVMObject.a  lib/libLLVMSupport.a  lib/libLLVMAArch64Desc.a  lib/libLLVMAArch64Info.a  lib/libLLVMAArch64Utils.a  lib/libLLVMAMDGPUDesc.a  lib/libLLVMAMDGPUInfo.a  lib/libLLVMAMDGPUUtils.a  lib/libLLVMARMDesc.a  lib/libLLVMARMInfo.a  lib/libLLVMARMUtils.a  lib/libLLVMAVRInfo.a  lib/libLLVMBPFInfo.a  lib/libLLVMHexagonDesc.a  lib/libLLVMHexagonInfo.a  lib/libLLVMLanaiDesc.a  lib/libLLVMLanaiInfo.a  lib/libLLVMMipsInfo.a  lib/libLLVMMSP430Info.a  lib/libLLVMPowerPCInfo.a  lib/libLLVMRISCVDesc.a  lib/libLLVMRISCVInfo.a  lib/libLLVMSparcInfo.a  lib/libLLVMSystemZDesc.a  lib/libLLVMSystemZInfo.a  lib/libLLVMVEInfo.a  lib/libLLVMWebAssemblyDesc.a  lib/libLLVMWebAssemblyInfo.a  lib/libLLVMWebAssemblyUtils.a  lib/libLLVMCodeGen.a  lib/libLLVMBitWriter.a  lib/libLLVMObjCARCOpts.a  lib/libLLVMScalarOpts.a  lib/libLLVMAggressiveInstCombine.a  lib/libLLVMInstCombine.a  lib/libLLVMTarget.a  lib/libLLVMTransformUtils.a  lib/libLLVMAnalysis.a  lib/libLLVMProfileData.a  lib/libLLVMSymbolize.a  lib/libLLVMDebugInfoPDB.a  lib/libLLVMDebugInfoMSF.a  lib/libLLVMX86Info.a  lib/libLLVMXCoreInfo.a  lib/libLLVMMCDisassembler.a  lib/libLLVMDebugInfoDWARF.a  lib/libLLVMObject.a  lib/libLLVMIRReader.a  lib/libLLVMBitReader.a  lib/libLLVMAsmParser.a  lib/libLLVMCore.a  lib/libLLVMRemarks.a  lib/libLLVMBitstreamReader.a  lib/libLLVMMCParser.a  lib/libLLVMMC.a  lib/libLLVMDebugInfoCodeView.a  lib/libLLVMTextAPI.a  lib/libLLVMBinaryFormat.a  lib/libLLVMSupport.a  -lrt  -ldl  -lm  /usr/lib/x86_64-linux-gnu/libz.so  /usr/lib/x86_64-linux-gnu/libtinfo.so  lib/libLLVMDemangle.a && :
collect2: fatal error: ld terminated with signal 9 [Killed]
compilation terminated.
[79/191] Linking CXX executable bin/llvm-cfi-verify
ninja: build stopped: subcommand failed.
```

### `Gold` Linker

My suspected cause was [`Out of Memory`](https://en.wikipedia.org/wiki/Out_of_memory). I had previously heard some people bash `ld` for consuming too much RAM when handling debug info. So I tried using [`gold`](https://manpages.ubuntu.com/manpages/trusty/man1/x86_64-linux-gnu-ld.gold.1.html) instead.

```bash
# Configure to build in Debug mode, using `gold`
$ cmake -S llvm -B build -G Ninja -DCMAKE_BUILD_TYPE=Debug -DLLVM_USE_LINKER=gold
$ cmake --build build
```

After making loud noises for an hour, **my computer just rebooted itself (and of course the build failed)**..

### `LLD` linker
[This page from the `gentoo linux wiki`](https://wiki.gentoo.org/wiki/Gold) mentions that `gold` isn't maintained actively, and kindly recommends to use the [`lld`](https://lld.llvm.org/) linker instead. 

```bash
# Configure to build in Debug mode, using `lld` linker
$ cmake -S llvm -B build -G Ninja -DCMAKE_BUILD_TYPE=Debug -DLLVM_ENABLE_LLD=ON
```

I got the following error:
```
CMake Error at cmake/modules/HandleLLVMOptions.cmake:309 (message):
  Host compiler does not support '-fuse-ld=lld'
Call Stack (most recent call first):
  CMakeLists.txt:875 (include)
```

My system's default C/C++ toolchain is GCC, which doesn't support using `LLD`.
I had to switch my system's default C/C++ toolchain to Clang in order to use `-DLLVM_ENABLE_LLD=ON`.
I found a [stackoverflow Q&A](https://stackoverflow.com/questions/70205358/how-to-use-llvm-toolchain-on-linux-always-by-default) with instructions on how to do so.
Eventually, I didn't try this route. I wanted a solution that involves no changes to my system's default settings.

### `-DBUILD_SHARED_LIBS=ON` to the Rescue
I read through relevant discussions & docs online:
* https://lists.llvm.org/pipermail/llvm-dev/2018-September/126305.html
* https://groups.google.com/g/llvm-dev/c/hCd4wAigCMo?pli=1
* https://llvm.org/docs/GettingStarted.html#common-problems

**`-DBUILD_SHARED_LIBS=ON`** is enough to get a successful Debug build
(on my system, for now).
```bash
$ cmake -S llvm -B build -G Ninja -DCMAKE_BUILD_TYPE=Debug -DBUILD_SHARED_LIBS=ON
$ cmake --build build
```
