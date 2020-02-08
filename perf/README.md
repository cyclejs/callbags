# Performance results

Run on a Lenovo Yoga X1 2nd Gen, 2.7 GHz Intel Core i7, ts-node `v8.6.2`

## fold

```
scan -> scan 1000000 integers
-----------------------------------------------------
@cycle/callbags    24.98 op/s ±  1.02%   (61 samples)
xstream            14.11 op/s ±  1.35%   (67 samples)
rxjs               14.06 op/s ±  2.24%   (67 samples)
most               28.22 op/s ±  2.05%   (67 samples)
-----------------------------------------------------
```

## dataflow

```
dataflow for 1000000 source events
-----------------------------------------------------
@cycle/callbags     8.53 op/s ±  2.37%   (45 samples)
xstream             4.67 op/s ±  0.79%   (27 samples)
rxjs                5.79 op/s ±  1.83%   (32 samples)
most               13.89 op/s ±  1.77%   (68 samples)
-----------------------------------------------------
```
