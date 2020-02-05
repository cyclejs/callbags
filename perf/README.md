# Performance results

Run on a Lenovo Yoga X1 2nd Gen, 2.7 GHz Intel Core i7, ts-node `v8.6.2`

## fold

```
scan -> scan 1000000 integers
-----------------------------------------------------
@cycle/callbags    25.69 op/s ±  0.59%   (63 samples)
callbag-basics     26.60 op/s ±  0.71%   (65 samples)
xstream            14.49 op/s ±  1.29%   (69 samples)
rxjs               15.10 op/s ±  1.75%   (72 samples)
most               27.80 op/s ±  1.97%   (67 samples)
-----------------------------------------------------
```
