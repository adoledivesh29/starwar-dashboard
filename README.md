# Star Wars Starships Dashboard

A modern, responsive web application for exploring and comparing starships from the Star Wars universe. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring a beautiful dark/light theme toggle and smooth animations.

##  Features

### Core Functionality
- **Starship Exploration**: Browse through all starships from the Star Wars universe
- **Real-time Search**: Search starships by name or ID with instant results
- **Pagination**: Efficient pagination with URL state management
- **Starship Comparison**: Compare up to 3 starships side-by-side with detailed specifications
- **Responsive Design**: Fully responsive design that works on all devices
- **Dark/Light Theme**: Beautiful theme toggle with smooth transitions
- **URL State Management**: Search queries and pagination state preserved in URL

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Query**: Efficient data fetching and caching
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Modern, utility-first styling
- **shadcn/ui**: Beautiful, accessible UI components
- **Jotai**: Lightweight state management
- **Virtual Scrolling**: Optimized performance for large datasets

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Jotai
- **Data Fetching**: TanStack React Query
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API Contract**: ts-rest

## 📋 API Limitations & Design Decisions

### Why No Advanced Filters?

The Star Wars API (SWAPI) has specific limitations that influenced our design decisions:

**API Response Structure:**
The main starships endpoint only returns basic information:
```json
{
  "name": "CR90 corvette",
  "uid": "2", 
  "url": "https://www.swapi.tech/api/starships/2"
}
```

**Detailed Data Access:**
To get comprehensive starship details (manufacturer, crew, hyperdrive rating, etc.), we need to make additional API calls to individual starship URLs. This creates a natural flow limitation:

1. **Initial Load**: Fetch basic starship list
2. **Detail Fetching**: Make separate requests for each starship's details
3. **Filtering Challenge**: Implementing filters on detailed properties would require fetching ALL starship details first, which is inefficient and goes against the API's design

### Alternative Implementation

Instead of traditional filters, we implemented:

- **Smart Search**: Real-time search across starship names and IDs
- **Comparison Feature**: Side-by-side comparison of selected starships with full details
- **Efficient Data Loading**: Only fetch detailed information when needed (for comparison or individual views)
- **Performance Optimization**: Client-side pagination and search for better user experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd starwar-dashboard
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main dashboard page
│   └── starships/         # Starship detail pages
├── components/            # Reusable UI components
│   ├── CompareModal.tsx   # Starship comparison modal
│   ├── SearchBar.tsx      # Search functionality
│   ├── StarshipTable.tsx  # Main data table
│   ├── ThemeToggle.tsx    # Dark/light theme toggle
│   └── ...
├── hooks/                 # Custom React hooks
│   ├── useStarships.ts    # Starship data fetching
│   ├── useCompare.ts      # Comparison state management
│   └── ...
├── lib/                   # Utility libraries
│   ├── api/              # API contracts and clients
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
└── state/                # Global state management
    ├── searchQueryAtom.ts
    └── selectedStarshipsAtom.ts
```

This README provides a comprehensive overview of your Star Wars dashboard project, explaining the technical decisions, API limitations, and the alternative features you implemented instead of traditional filters. It highlights the smart design choices you made to work within the API constraints while still delivering a great user experience.

## 🎯 Key Features Explained

### 1. Efficient Data Fetching
- **Basic Data**: Fetches minimal starship information for the main list
- **Lazy Loading**: Detailed information only when needed (comparison, individual views)
- **Caching**: React Query handles caching and background updates

### 2. Search & Pagination
- **Client-side Search**: Instant search across starship names and IDs
- **URL State**: Search queries and page numbers preserved in URL
- **Responsive Pagination**: Efficient pagination with proper navigation

### 3. Starship Comparison
- **Multi-select**: Select up to 3 starships for comparison
- **Detailed View**: Side-by-side comparison with all specifications
- **Visual Indicators**: Clear selection state and comparison modal

### 4. Theme System
- **Dark/Light Toggle**: Beautiful theme switching with smooth transitions
- **System Preference**: Respects user's system theme preference
- **Persistent State**: Theme choice saved in localStorage

## 🔧 Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## 🌟 Performance Optimizations

1. **Virtual Scrolling**: Efficient rendering of large datasets
2. **React Query**: Smart caching and background updates
3. **Code Splitting**: Automatic code splitting with Next.js
4. **Image Optimization**: Optimized images and icons
5. **Bundle Optimization**: Tree shaking and minimal bundle size

##  Design System

The application uses a comprehensive design system built with:
- **shadcn/ui**: Accessible, customizable components
- **Tailwind CSS**: Utility-first styling approach
- **Framer Motion**: Smooth animations and micro-interactions
- **Lucide Icons**: Beautiful, consistent iconography

## 🔮 Future Enhancements

While the current implementation focuses on core functionality, potential future enhancements could include:

- **Offline Support**: Service worker for offline functionality
- **Advanced Analytics**: User interaction tracking
- **Export Features**: PDF/CSV export of comparison data
- **Favorites System**: Save favorite starships
- **Advanced Search**: Filter by specific criteria (when API allows)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- **SWAPI.tech** for providing the Star Wars API
- **Next.js team** for the amazing framework
- **shadcn/ui** for the beautiful component library
- **Framer Motion** for smooth animations
- **Tailwind CSS** for the utility-first approach

---

**Note**: This dashboard is designed to work within the constraints of the SWAPI.tech API. The decision to implement search and comparison features instead of traditional filters was made to provide the best user experience while respecting the API's architecture and limitations.
