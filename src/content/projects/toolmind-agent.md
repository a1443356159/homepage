---
title: "ToolMind: Embodied Agent Pipeline"
description: "An end-to-end agent pipeline that lets a robotic arm perceive, reason about, and manipulate objects using RGB-D sensing and VLA-style planning."
date: 2026-07-01
featured: true
tags: ["Embodied AI", "VLA", "RGB-D"]
code: "#"
demo: "#"
---

ToolMind is an embodied-agent pipeline for a tabletop robotic arm workstation.
RGB-D perception builds a scene representation that a vision-language-action
planner consumes to decompose natural-language instructions into executable
motion primitives.

The project covers the full stack: camera calibration and depth fusion,
object-centric scene graphs, tool-use reasoning with an LLM planner, and
closed-loop execution on real hardware. The goal is a robust, inspectable
pipeline rather than a monolithic end-to-end black box.
