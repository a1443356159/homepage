---
title: "Looped Flow Matching"
description: "A training-free inference framework that repeatedly refines intermediate hidden states in frozen flow-matching image generators."
date: 2026-06-01
featured: true
tags: ["Flow Matching", "DiT", "Test-Time Compute"]
image: "/images/looped-flow-matching/teaser_qualitative_efficiency.png"
page: "/projects/looped-flow-matching"
paper: "/projects/looped-flow-matching"
code: "#"
---

Looped Flow Matching explores how the inference trajectory of a pre-trained
flow-matching model can be turned into an iterative refinement process without
touching any model weights. By replaying selected transformer layers inside a
frozen DiT denoiser, the model gains additional "thinking steps" at test time,
trading compute for sample quality.

The framework studies which hidden-state representations are worth refining,
how many loops are useful before diminishing returns, and how token-selective
looping can concentrate extra compute on the image regions that need it most.
All experiments are training-free and plug into standard flow-matching samplers.

See the [project page](/projects/looped-flow-matching) for the method overview,
main results, and qualitative comparisons.
