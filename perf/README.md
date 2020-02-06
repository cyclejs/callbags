# Performance results

Run on a Lenovo Yoga X1 2nd Gen, 2.7 GHz Intel Core i7, ts-node `v8.6.2`

## fold

```
scan -> scan 1000000 integers
-----------------------------------------------------
@cycle/callbags    25.17 op/s ±  0.87%   (62 samples)
callbag-basics     24.98 op/s ±  1.05%   (62 samples)
xstream            14.03 op/s ±  1.67%   (68 samples)
rxjs               14.29 op/s ±  3.08%   (70 samples)
most               28.32 op/s ±  1.86%   (67 samples)
-----------------------------------------------------
```
