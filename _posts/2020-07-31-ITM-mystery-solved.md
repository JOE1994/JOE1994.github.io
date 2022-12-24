---
layout: post
title: "ITM Mystery Solved"
---

In the source code below, the first `iprintln!` gets caught in a spinlock forever, while the second `iprintln!` transmits an ITM packet as expected.
I didn't have answers to why the two `iprintln!` were behaving differently until today.

It was due to the different behavior of `ITM::ptr().read()` & `*ITM::ptr()`

### `ITM::ptr().read()`
Performs a bitwise copy from `ITM::ptr()`. Copying the struct is useless,
because writing to the bitwise copy has no effect to the actual hardware register block.
This was why my program hung forever at https://docs.rs/cortex-m/0.6.3/src/cortex_m/itm.rs.html#16 .

### `*ITM::ptr()`
Provides direct access to the memory pointed by `ITM::ptr()`. Writing to struct `*ITM::ptr()` is writing directly to the hardware register block.

```rust
#![no_main]
#![no_std]

extern crate panic_abort;
use stm32f4xx_hal as hal;
use crate::hal::{
    prelude::*,
    stm32,
};
use cortex_m::{iprintln, Peripherals};
use cortex_m_rt::entry;
use cortex_m::peripheral::ITM;
use cortex_m::asm::bkpt;

#[entry]
fn main() -> ! {
    if let (Some(p), Some(cp)) = (stm32::Peripherals::take(), Peripherals::take()) {
        // Constrain clock registers
        let rcc = p.RCC.constrain();
        // Configure clock to 168 MHz (i.e. the maximum) and freeze it
        rcc.cfgr.sysclk(168.mhz()).freeze();
        
        // Below line hangs forever at https://docs.rs/cortex-m/0.6.3/src/cortex_m/itm.rs.html#16
        iprintln!(unsafe { &mut ITM::ptr().read().stim[0] }, "HELLO-1");
        
        // Below line works properly as expected!
        iprintln!(unsafe { &mut (*ITM::ptr()).stim[0] }, "HELLO-2");
    }
    loop { }
}
```
