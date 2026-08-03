---
title: "Training-Free Hidden-State Refinement for Flow-Matching Image Generators"
authors: "Yuanyi Yan"
venue: "Manuscript in preparation"
status: "in-preparation"
date: 2026-06-15
paper: "/projects/looped-flow-matching"
---

A training-free looping framework that improves frozen flow-matching image
generators by repeatedly applying selected transformer layers inside each
denoising call. Dense and Sparse Token Loop vary the token scope,
Sampling-Progress Gating controls when looping is active, and Loop Guidance
combines ordinary and looped vector-field predictions. On Scale-RAE DiT2.4B,
Loop Guidance raises GenEval from 0.4471 to 0.5691 and DPG-Bench from 0.7656
to 0.8053 without any retraining.
