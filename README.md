# USGS Earthquake Dashboard

A high-performance, interactive dashboard for real-time earthquake monitoring. This application visualizes earthquake data via professional scatter charts and synchronized data tables, with a focus on ease of use and visual clarity.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Brijsunil2/usgs-earthquake-dashboard.git
   cd usgs-earthquake-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🛠️ Tech Stack & Dependencies

### Core
- **React 19**: Modern UI library for building the components.
- **Vite**: Fast build tool for an optimized development experience.

### State & Visualization
- **Zustand**: Used for lightweight, global state management. This is critical for syncing the **selected earthquake** across the independent Chart and Data Table components.
- **Recharts**: High-performance charting library used for the dynamic Scatter plot.
- **Tailwind CSS**: A utility-first CSS framework used to create the professional, high-contrast dark theme with glassmorphism effects.

---

## ✨ Key Features & Technical Reasoning

### 1. Selection System
- **Implementation**: When a data point is clicked on the chart, the application captures its screen coordinates and data. This information is shared via the Zustand store.
- **Reasoning**: This provides a seamless UX where selecting a visual point immediately scrolls the data table to the corresponding row, and vice versa.

### 2. Manual Coordinate Tracking for Tooltips
- **Implementation**: We use a `useRef` and `useEffect` pattern to "capture" the SVG coordinates (`cx`, `cy`) of the selected data point during the render pass. 
- **Reasoning**: Recharts tooltips are typically hover-based. To support a **persistent, click-based tooltip overlay**, we manually track the coordinates to ensure the tooltip follows the point precisely across axis changes and resizing.

### 3. Capture Latest Data
- **Implementation**: The dashboard is limited to the **latest 500 records** for both the chart and the table.
- **Reasoning**: Rendering thousands of interactive SVG elements can degrade performance. Capping at 500 ensures a smooth 60fps interaction and near-instant filtering/searching on most hardware.

---

## 🤖 AI-Powered Development Process

This project was built using **Antigravity (Gemini 3 Flash)** which is the coding assistant I'm using. Prototyping and brainstorming ideas using **ChatGPT**.

**ChatGPT** was used to get the initial idea of what to build and how to build it. It was also used to help with the implementation details of the project. Also how to break down the project into smaller, more manageable tasks.

**Antigravity** was used to help with the implementation details of the project. I like to feed small chunks of code to the AI and get feedback on it. also, I would use it to generate small chunks of code that I could use in my project. **Antigravity** will show me what was changed and if I like it I can accept it or if I don't like it I can reject it. 

---

## 📅 Data Source
Data is fetched live from the [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).
