---
layout: post
title: "Floating-Point Arithmetic & the Patriot Missile Failure"
---

**Practice Problem**s 2.46 & 2.51 from the [CS:APP3e book](https://csapp.cs.cmu.edu/) demonstrate how loss of precision in floating-point representation can cause real world problems by citing the ["The Patriot Missile Failure"](https://www-users.cse.umn.edu/~arnold/disasters/patriot.html).

## Practice Problem 2.46

> The imprecision of floating-point arithmetic can have disastrous effects.
> On February 25, 1991, during the first Gulf War, an American Patriot Missile battery in Dharan, Saudi Arabia, failed to intercept an incoming Iraqi Scud Missile.
> The Scud struck an American Army barracks and killed 28 soldiers.

> The Patriot system contains an internal clock, implemented as a counter that is incremented every 0.1 seconds.
> To determine the time in seconds, the program would multiply the value of of this counter by a 24 bit quantity that was a fractional binary approximation to 1/10.
> In particular, the binary representation of 1/10 is the non-terminating sequence 0.000110011[0011]...<sub>2</sub>

> The program approximated 0.1, as value x, by considering just the first 23 bits of the sequence to the right of the binary point: x = 0.00011001100110011001100<sub>2</sub>

> **A**: What is the binary representation of **0.1 - x**?

* 0.00000000000000000000000[1100]<sub>2</sub>

> **B**: What is the approximate decimal value of **0.1 - x**?

* Since binary representation of 0.1 is 0.000[1100]<sub>2</sub>, approximate decimal value of **(0.1 - x)** is 2<sup>-20</sup> x 0.1 ≈ 9.54 x 10<sup>-8</sup>

> **C**: The clock starts at 0 when the system is first powered up and keeps counting from there. In this case, the system had been running for around 100 hours. What was the difference between the actual time and the time computed by software?

* 9.54 x 10<sup>-8</sup> x 100 x 60 x 60 x 10 ≈ 0.343 seconds

> **D**: The system predicts where an incoming missile will appear based on its velocity and the time of the last radar detection. Given that a Scud travels at 2000 meters per second, how far off was its prediction?

* 0.343 x 2000 ≈ 687 meters

## Practice Problem 2.51

> We saw in Problem 2.46 that the Patriot missile software approximated 0.1 as 0.00011001100110011001100<sub>2</sub>. Suppose instead they had used IEEE round-to-even mode to determine an approximation x' to 0.1 with 23 bits right of the binary point.

> **A**: What is the binary representation of **x'**?

* 0.00011001100110011001101<sub>2</sub>

> **B**: What is the approximate decimal value of **x' - 0.1'**?

* Binary representation of (x' - 0.1) is 0.0000000000000000000000000[1100]*<sub>2</sub>
* Since binary representation of 0.1 is 0.000[1100]<sub>2</sub>, approximae decimal value of **(x' - 0.1)** is 2<sup>-22</sup> x 0.1 ≈ 2.38 x 10<sup>-8</sup>

> **C**: How far off would the computed clock have been after 100 hours of operation?

* 2.38 x 10<sup>-8</sup> x 100 x 60 x 60 x 10 ≈ 0.086 seconds
  * factor of 4 less than the error in the Patriot system

> **D**: How far off would the program's prediction of position of the Scud missile have been?

* 0.086 x 2000 ≈ 171 meters
