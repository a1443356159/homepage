---
title: "Training-Free Hidden-State Refinement"
fullTitle: "Training-Free Hidden-State Refinement for Flow-Matching Image Generators"
description: "A training-free framework that improves frozen flow-matching image generators by repeating selected transformer layers inside each denoising call."
date: 2026-08-29
featured: true
tags: ["Flow Matching", "DiT", "Inference-Time Compute"]
image: "/images/looped-flow-matching/teaser_qualitative_efficiency.png"
page: "/projects/looped-flow-matching"
venue: "arXiv:2608.29160 [cs.CV], 2026"
arxiv: "https://arxiv.org/abs/2608.29160"
authors:
  - name: "Yuanyi Yan"
    affiliations: [1]
  - name: "Xinzhe Rao"
    affiliations: [1]
  - name: "Canyu Shen"
    affiliations: [2]
  - name: "Yang Chen"
    affiliations: [1]
  - name: "Yunlu Chen"
    affiliations: [3]
  - name: "Meng Tang"
    affiliations: [4]
  - name: "Teng Long"
    affiliations: [5]
  - name: "Vincent Tao Hu"
    affiliations: [1]
affiliations:
  - "Huazhong University of Science and Technology"
  - "Tongji University"
  - "King Abdullah University of Science and Technology"
  - "University of California, Merced"
  - "University of Amsterdam"
abstract: >-
  We study how to spend additional inference-time computation inside a frozen
  flow-matching image denoiser, without changing its weights or outer sampler.
  The framework repeats selected transformer layers and exposes independent
  controls over token scope, layer depth, sampling progress, loop count, and
  prediction-space guidance. Across Scale-RAE and RAEv2 generators, the method
  improves prompt alignment and image-quality metrics while offering useful
  quality–latency trade-offs.
highlights:
  - value: "+0.1220"
    label: "GenEval"
    detail: "0.4471 → 0.5691 on Scale-RAE DiT2.4B"
  - value: "+0.0397"
    label: "DPG-Bench"
    detail: "0.7656 → 0.8053 on Scale-RAE DiT2.4B"
  - value: "39.6%"
    label: "Lower latency"
    detail: "Sparse versus Dense Token Loop on DiT9.8B"
  - value: "0"
    label: "Training updates"
    detail: "Weights, conditioning, autoencoder, and sampler stay frozen"
results:
  - model: "Scale-RAE DiT2.4B"
    method: "Dense Token Loop + Loop Guidance"
    baselineGenEval: 0.4471
    resultGenEval: 0.5691
    baselineDpg: 0.7656
    resultDpg: 0.8053
  - model: "Scale-RAE DiT9.8B"
    method: "Dense Token Loop + Loop Guidance"
    baselineGenEval: 0.5321
    resultGenEval: 0.6432
    baselineDpg: 0.8003
    resultDpg: 0.8264
  - model: "RAEv2 SigLIP2-B"
    method: "Dense Token Loop + Loop Guidance"
    baselineGenEval: 0.3829
    resultGenEval: 0.4532
    baselineDpg: 0.7131
    resultDpg: 0.7521
paper: "https://arxiv.org/pdf/2608.29160"
code: "https://github.com/a1443356159/looped-flow-matching"
bibtex: |
  @misc{yan2026trainingfree,
    title={Training-Free Hidden-State Refinement for Flow-Matching Image Generators},
    author={Yan, Yuanyi and Rao, Xinzhe and Shen, Canyu and Chen, Yang and Chen, Yunlu and Tang, Meng and Long, Teng and Hu, Vincent Tao},
    year={2026},
    eprint={2608.29160},
    archivePrefix={arXiv},
    primaryClass={cs.CV},
    url={https://arxiv.org/abs/2608.29160}
  }
---

## Technical summary

**Dense Token Loop** repeats the selected transformer-layer range for every
token. **Sparse Token Loop** repeats only a selected subset while reusing a
cached complement residual, preserving full-token attention context with less
repeated computation. **Sampling-Progress Gating** activates looping only over
chosen denoising calls, and the loop-layer range controls where the extra
updates occur. **Loop Guidance** combines the ordinary and looped vector-field
predictions as an independent prediction-space control.

## Evaluation and scope

The main study evaluates Scale-RAE DiT2.4B, Scale-RAE DiT9.8B, and an RAEv2
SigLIP2-B proxy with GenEval and DPG-Bench as primary metrics. Controlled
ablations vary loop count, layer range, sampling-progress interval, sparse-token
selection, and guidance strength. Transfer studies also cover PixArt-alpha and
FLUX.2.

The gains are strongest on prompt sets dominated by one or two subjects, where
looping often repairs malformed structure and improves attribute binding. The
aggregate GenEval2 result does not improve, indicating that hidden-state
refinement does not by itself solve difficult counting and crowded multi-object
composition.

## Reproducibility

The public repository includes the backend-neutral runtime, adapters for four
generator families, exact paper presets, 2,418 ordered benchmark prompts,
aggregate table values, CPU-only tests, and generation/export/aggregation
utilities. It excludes model weights, generated images, evaluator outputs,
credentials, and machine-specific paths.
