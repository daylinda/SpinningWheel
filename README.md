# Spinning Wheel

A spinning wheel web app built with React, TypeScript, and Vite. It loads applicant data from an API endpoint, spins a roulette wheel, and displays the selected winner’s details.

## Features

- Interactive spinning wheel UI
- Random winner selection
- Winner details card showing:
  - Full name
  - Email
  - Phone number
  - Submission ID
- Loading, empty, and error states
- Animated background effects

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind-related tooling
- GSAP
- chroma-js
- react-custom-roulette-r19

## How It Works

The app fetches applicant data from:

```bash
/api/applicants
