# Tennis Courts Review App

A mobile-first React Native application for browsing and reviewing tennis courts. Built with Expo and TypeScript.

## Features

- 55+ tennis courts with search functionality
- Court detail views with ratings and reviews
- Add review capability with star ratings
- Modern, mobile-optimized UI
- Full TypeScript implementation

## Installation

```bash
cd tennis-courts
npm install
npx expo start
```

## Running the App

- **Mobile**: Scan QR code with Expo Go app
- **Web**: Press `w` or visit http://localhost:8081

## Project Structure

```
src/
├── types/Court.ts              # TypeScript interfaces
├── data/courts.ts              # Mock data (55 courts)
├── components/                 # Reusable UI components
└── screens/                    # Main screens (List, Detail)
```

## Technologies

- React Native + Expo SDK 54
- TypeScript
- React Navigation v6

## AI-Assisted Development

This project leveraged GitHub Copilot to accelerate development while maintaining full architectural control. AI was used strategically for scaffolding, mock data generation, and debugging guidance.

### Prompts Used

**Prompt 1:**
```
I'm building a mobile-first React Native app for a tennis court review flow. I already have the architecture in mind, but I want a clean implementation pattern for a searchable court list and a court detail screen where users can read and add reviews. The app uses mock data (50+ courts) and only needs local state. Please provide guidance consistent with Expo + TypeScript best practices.
```

**Prompt 2:**
```
Generate a simple and well-organized Expo TypeScript project setup using React Navigation with two screens. I only want the essential scaffolding so I can layer in the feature work myself.
```

**Prompt 3:**
```
Create a mock dataset of around 55 tennis courts with predictable structure, including id, name, location, an Unsplash image URL, indoor/outdoor information, surface type, and a few sample reviews per court. Keep the output clean and easy to integrate with TypeScript types.
```

**Prompt 4:**
```
I need a quick reference implementation for the core UI pieces: a reusable SearchBar, a CourtCard for list rendering, a ReviewItem, and a simple AddReviewForm. Keep the implementations lightweight and mobile-friendly so I can refine the styling and UX myself.
```

### Approach

AI accelerated initial setup and boilerplate code while I maintained control over:
- Component architecture and state management
- UI/UX refinements and styling decisions
- Performance optimizations (FlatList, useMemo)
- Debugging React Native Fabric compatibility issues

## Challenge Compliance

✅ Mobile-first design  
✅ Two-page app (List + Detail)  
✅ Search functionality  
✅ Court detail view with reviews  
✅ Add review capability  
✅ React Native (preferred framework)  
✅ 55 courts (> 50 bonus)  
✅ All AI prompts documented

---

*Built by Aditya Bhuran for BYOB Sports Frontend Challenge (December 2024)*
