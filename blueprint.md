# Project Blueprint: Lucky Number Generator

## Overview
A simple, modern web application designed to generate lucky numbers for South Korea's two most popular lottery games: **Lotto 6/45** and **Pension Lottery 720+** (Yeon-geum Bok-gwon). The app provides users with 5 sets of random numbers for each game upon request, presented in a visually appealing, responsive interface.

## Current Plan: Initial Implementation

### Objectives
1.  **Lotto 6/45 Generation**: Generate 5 combinations of 6 unique numbers (1-45).
2.  **Pension Lottery 720+ Generation**: Generate 5 combinations consisting of 1 Group (1-5) and 6 Digits (0-9).
3.  **User Interface**:
    *   Clean, modern design using cards and shadows.
    *   Responsive layout for mobile and desktop.
    *   Visual representation of lottery balls with correct color coding (Yellow, Blue, Red, Grey, Green).

### Technical Details
*   **HTML**: Semantic structure with sections for each game type.
*   **CSS**:
    *   Flexbox/Grid for layout.
    *   CSS Variables for theming and ball colors.
    *   Animations for number reveal.
*   **JavaScript**:
    *   `Math.random()` for number generation.
    *   DOM manipulation to render results dynamically.

### Steps
1.  **Update `index.html`**: Create the structure with headers, buttons, and result containers.
2.  **Update `style.css`**: Implement the visual style, including ball colors and layout.
3.  **Update `main.js`**: Implement the number generation logic and event handling.
