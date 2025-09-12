Project Summary
The project is focused on developing an internal web dashboard for a Computerized Maintenance Management System (CMMS) tailored for factories. This dashboard features a minimalist and responsive interface that supports light/dark mode, providing insights into equipment maintenance, downtime tracking, and overall operational efficiency. Enhanced navigation is facilitated by a sidebar that organizes various management modules, making it easier for users to access critical information.

Project Module Description
The dashboard consists of the following functional modules:

Header: Displays the logo, title, dark mode toggle, and user menu.
Sidebar: Navigation through management sections, including equipment management, maintenance tracking, incident management, inventory control, scheduling, reporting, and user management.
Filter Bar: Allows users to filter data by date range, area, equipment, and report type.
KPI Section: Displays key performance indicators related to downtime and maintenance.
Charts: Visual representations of data, including downtime reasons, trends, and work status.
Data Table: Displays detailed records with sorting and filtering capabilities.
Table Toolbar: Options for exporting data and saving filter configurations.
Toast Notifications: Alerts users about actions performed within the dashboard.
Directory Tree
dashboard/
│
├── README.md                # Project overview and instructions
├── eslint.config.js         # ESLint configuration file
├── index.html               # Main HTML file for the dashboard
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── src/                     # Source files for the application
│   ├── App.jsx              # Main application component
│   ├── components/          # UI components
│   │   ├── Dashboard.jsx     # Main dashboard layout
│   │   ├── Header.jsx        # Header component
│   │   ├── Sidebar.jsx       # Sidebar component with navigation
│   │   ├── filters/          # (Removed) Old filter components
│   │   ├── shared/           # Shared components
│   │   │   └── FilterBar.jsx # Updated filter component
│   │   ├── kpi/             # KPI components
│   │   │   ├── KPICard.jsx   # Individual KPI card
│   │   │   └── KPISection.jsx # Container for KPI cards
│   │   ├── charts/          # Chart components
│   │   │   ├── DowntimeReasonChart.jsx # Bar chart for downtime reasons
│   │   │   ├── DowntimeTrendChart.jsx  # Line chart for downtime trends
│   │   │   └── WorkStatusChart.jsx      # Pie chart for work status
│   │   ├── table/           # Table components
│   │   │   ├── DataTable.jsx # Main data table
│   │   │   └── TableToolbar.jsx # Toolbar for table actions
│   │   ├── ui/              # UI components
│   │   │   ├── DarkModeToggle.jsx # Button for toggling dark mode
│   │   │   ├── Toast.jsx     # Toast notifications component
│   │   │   └── UserMenu.jsx  # User menu component
│   ├── context/             # Context API for theme management
│   │   └── ThemeContext.jsx  # Theme context for dark/light mode
│   ├── data/                # Mock data for the application
│   │   ├── cmmsMockData.js   # Mock data for CMMS dashboard
│   ├── index.css            # Global styles
│   └── vite.config.js       # Vite configuration file
└── tailwind.config.js       # Tailwind CSS configuration
File Description Inventory
README.md: Overview and setup instructions for the project.
eslint.config.js: Configuration for linting JavaScript code.
index.html: Entry point for the application.
package.json: Lists dependencies and scripts for building and running the project.
postcss.config.js: Configuration for PostCSS processing.
src/: Contains all source files, including components, context, data, and styles.
tailwind.config.js: Configuration for Tailwind CSS utility framework.
vite.config.js: Configuration for Vite, the build tool.
Technology Stack
React: JavaScript library for building user interfaces.
Tailwind CSS: Utility-first CSS framework for styling.
Recharts: Charting library for rendering charts and graphs.
Context API: For managing application state, particularly theme management.
Mock Data: Used for simulating real data during development.
Usage
Install dependencies:
pnpm install
Run linting and build the project:
pnpm run lint && pnpm run build
Open the index.html file in a web browser to view the dashboard.