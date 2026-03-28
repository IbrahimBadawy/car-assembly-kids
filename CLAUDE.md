# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Interactive 3D car assembly simulation for 6-year-old children. Teaches car parts in Egyptian Arabic with AI-generated voice narration and illustrations. Built with React + Three.js.

## Commands

```bash
# Development
npm run dev              # Start Vite dev server (port 5173)
npm run build            # Production build to dist/
npm run preview          # Preview production build

# Asset Generation (one-time, requires Gemini API key)
npm run generate-assets  # Generate images (Gemini 2.5 Flash Image) + audio (Gemini 2.5 Flash TTS)
```

## Architecture

- **3D Rendering**: React Three Fiber (`@react-three/fiber`) with `@react-three/drei` helpers
- **Animation**: `@react-spring/three` for physics-based spring animations (explode/assemble transitions)
- **State**: Zustand store (`src/stores/useAppStore.js`) manages app screen, selected/hovered part, exploded state, discovered parts, audio
- **Assets**: Pre-generated via Gemini API, stored as static files in `public/assets/`. No runtime API calls.

### Key Data Flow
1. `src/data/partsData.js` - Central config for all 10 car parts (positions, colors, narration scripts, icons)
2. `src/components/Car/CarModel.jsx` - Maps part data to 3D components via `CarPart` wrapper
3. `src/components/Car/CarPart.jsx` - Handles hover/click/spring animation for each part
4. `src/components/UI/PartInfoPanel.jsx` - Shows part image + description + plays WAV narration on selection

### Asset Generation Pipeline
`scripts/generate-assets.js` calls Gemini API to produce:
- 10 PNG illustrations → `public/assets/images/{partId}.png` (model: `gemini-2.5-flash-image`)
- 12 WAV narrations → `public/assets/audio/{partId}.wav` (model: `gemini-2.5-flash-preview-tts`)
- Audio is raw PCM L16 24kHz from Gemini, wrapped with WAV header by the script

### Screen Flow
`welcome` → `playing` (3D scene + HUD) → `celebration` (confetti on all 10 parts discovered)

## Important Notes
- Audio files are WAV format (PCM L16 24kHz mono with WAV header), NOT MP3
- RTL layout throughout - UI positioned accordingly (progress tracker: left, info panel: right)
- OrbitControls auto-rotate stops when exploded or part selected
- All 10 car parts built procedurally with Three.js geometries (no external GLB models)
