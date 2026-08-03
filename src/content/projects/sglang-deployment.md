---
title: "SGLang Inference Deployment"
description: "Practical deployment of large-model inference services with SGLang: quantization, scheduling, and throughput-oriented serving on limited GPU budgets."
date: 2026-05-01
featured: false
tags: ["LLM Serving", "Systems"]
code: "#"
---

This project documents hands-on work serving large language and multimodal
models with SGLang. It covers environment setup, weight quantization choices,
continuous batching and radix-cache configuration, and benchmarking latency /
throughput trade-offs on modest GPU hardware.

The outcome is a reproducible serving setup plus a set of notes on what
actually matters for efficient inference in a research-lab setting, where
GPUs are shared and workloads are bursty.
