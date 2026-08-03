---
title: "Notes on Flow Matching"
description: "Working notes on flow matching: the continuity equation, optimal transport paths, and how conditional flows give a tractable training objective."
date: 2026-08-01
tags: ["Flow Matching", "Generative Models", "Notes"]
---

These are informal working notes I wrote while getting comfortable with the
flow-matching framework. Nothing here is novel — it is a personal
re-derivation of the standard results, kept as a reference.

## From diffusion to flows

Diffusion models define a stochastic forward process that gradually destroys
data, then learn to reverse it. Flow matching takes a cleaner view: directly
regress a **vector field** `v_t(x)` whose induced flow transports a simple
base distribution (usually a Gaussian) to the data distribution. If
`p_t` is the marginal density along the path, the continuity equation

```
∂_t p_t + ∇ · (p_t v_t) = 0
```

tells us exactly which vector fields are consistent with the marginals.

## Conditional flow matching

The marginal objective is intractable, but conditioning on a data sample
`x_1` makes it simple. Pick a conditional path — e.g. the straight line from
the optimal-transport family,

```
x_t = (1 - t) x_0 + t x_1,   u_t(x | x_1) = x_1 - x_0
```

and train `v_θ(t, x_t)` to predict the conditional velocity `x_1 - x_0`.
Averaging over `(x_0, x_1)` pairs recovers the correct marginal field. This
is the whole trick: simulation-free training with a regression loss.

## What I'm thinking about next

- How much can test-time compute (extra refinement loops over intermediate
  hidden states) substitute for more sampling steps?
- Where in the DiT backbone does the trajectory become "decided", and can
  early tokens be frozen to save compute?
- Connections between rectified-flow reflow and hidden-state refinement.
