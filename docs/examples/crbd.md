---
id: crbd
title: Constant rate birth-death
sidebar_label: CRBD
---

# Constant rate birth-death

- `models/phylo/crbd`

The version `crbd_quick.tppl` uses a technique called Jan's walk to not waste information at the end of the branch.  A tree (data) is provided.  To compile do

```bash
tpplc models/phylo/crbd/crbd_quick.tppl models/phylo/crbd/alcedinidae.mc -m smc-bpf out.mc && mi compile out.mc
```

Now you can use the executable `out [number of particles] [number of sweeps]` to estimate the marginal likelihood of the model and get samples from the posterior of the lineage-splitting rate λ.  Here, it is very crucial that you use an advanced inference method such as SMC-BPF or SMC-APF as the default importance sampling will not result in a good sample.

Feel free to experiment with the model, change the input, the priors, or the output.

