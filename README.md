# ExpenseTracker 💰 (Frontend)

ExpenseTracker is a modern full-stack web application for personal expense tracking and financial budgeting. The frontend is built using **React 19**, **Vite**, **Tailwind CSS v4**, and **Axios**, featuring a responsive dark/light UI, interactive data visualization charts, and reactive global authentication state management.

🌐 **Live Application (Vercel):** 👉 [expense-tracker-frontend-iota-one.vercel.app](https://expense-tracker-frontend-iota-one.vercel.app)  
⚙️ **Backend API (Render):** `https://expense-tracker-backend-1-885b.onrender.com`

---

## 🔐 Authentication & State Architecture

- **Global Auth Context (`AuthContext.jsx`)**: Reactive user session management tracking `token`, `userId`, `userName`, and authentication state across all routes.
- **Centralized API Client (`apiClient.js`)**: Configured Axios instance with environment variable base URL fallback, automated `Bearer` token request interceptor, and global `401 Unauthorized` handling.
- **Protected Routing**: Navigation guards redirecting unauthenticated users to Login while shielding Dashboard and Add Expense screens.
- **JWT Storage**: Tokens securely managed via client state and `localStorage`.

---

## 🔹 Features

- ✅ **User Authentication**: Login & Registration with real-time field validation and toast feedback.
- ✅ **Reactive Context State**: Instant UI updates on authentication state changes without page reloads.
- ✅ **Dashboard Analytics**: Category breakdown pie charts, monthly line graphs, and top expense bar charts.
- ✅ **Budget Management**: Real-time spending indicators and budget threshold warnings.
- ✅ **Expense Operations**: Add, filter, edit modal, and sweetalert confirmation deletions.
- ✅ **Theme Customization**: Smooth dark and light mode toggle with state persistence.
- ✅ **Responsive Design**: Tailored layout for mobile, tablet, and desktop viewports.

---

## 🔹 Technologies Used

- **Core**: React 19, JavaScript (ES6+), HTML5, CSS3
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **HTTP Client**: Axios (Centralized Interceptors)
- **Charts**: Recharts, Chart.js / react-chartjs-2
- **Notifications & UI Modals**: React Toastify, SweetAlert2
- **Deployment**: Netlify

---

## 🔹 Project Structure

```
expense-tracker/
├── public/
│   └── _redirects
├── src/
│   │   App.jsx
│   │   index.css
│   │   main.jsx
│   │
│   ├── assets/
│   │   └── images/
│   │           login.png
│   │           spending.png
│   │
│   ├── components/
│   │   │   ExpenseForm.jsx
│   │   │   FloatingInput.jsx
│   │   │   Navbar.jsx
│   │   │
│   │   ├── charts/
│   │   │       BudgetUsageChart.jsx
│   │   │       CategoryPieChart.jsx
│   │   │       MonthlyLineChart.jsx
│   │   │       TopCategoryBarChart.jsx
│   │   │
│   │   └── dashboard/
│   │           EditExpenseModal.jsx
│   │           ExpenseFilters.jsx
│   │           ExpenseTable.jsx
│   │           SummaryCards.jsx
│   │
│   ├── context/
│   │       AuthContext.jsx
│   │
│   ├── pages/
│   │       AddExpense.jsx
│   │       Dashboard.jsx
│   │       Login.jsx
│   │       Register.jsx
│   │
│   ├── services/
│   │       apiClient.js
│   │       BudgetService.js
│   │       ExpenseService.js
│   │
│   └── utils/
│           categoryColors.js
│           swalTheme.js
│
├── .env
├── package.json
└── vite.config.js
```

---

## 🔹 How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ankushbadgujar002/expense-tracker-frontend.git
   cd expense-tracker-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:8080
   ```
   *(For connecting to live Render backend, set `VITE_API_URL=https://expense-tracker-backend-1-885b.onrender.com`)*

4. **Start Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🔹 Deployment Details

| Layer | Hosting Provider | Live URL |
| :--- | :--- | :--- |
| ⚛️ **Frontend** | **Netlify** | [https://expense-tracker-ankush.netlify.app](https://expense-tracker-ankush.netlify.app) |
| 🍃 **Backend API** | **Render** | `https://expense-tracker-backend-1-885b.onrender.com` |
| 🗄️ **Database** | **Aiven MySQL** | Cloud MySQL Database |

---

## 🔹 Author

**Ankush Badgujar**  
Information Technology Student  
Frontend Web Developer (Fresher) | Full Stack Java Developer (Fresher)

- **GitHub:** [@ankushbadgujar002](https://github.com/ankushbadgujar002)

---

## 🔹 Future Enhancements

- 📧 Email verification on registration
- 🔑 Password reset & recovery flow
- 📤 Export transactions to CSV / PDF format
- 👤 Extended user profile management
- 📱 Progressive Web App (PWA) support
