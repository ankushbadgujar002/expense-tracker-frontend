# ExpenseTracker 💰

ExpenseTracker is a full-stack web application developed using **React.js**, **Spring Boot**, and **MySQL**. The project includes a secure JWT-based authentication system to control access to protected pages.

Users must register first, then log in using the same credentials to access the dashboard and expense management features.

🌐 **Live Demo:** 👉 [expense-tracker-ankush.netlify.app](https://expense-tracker-ankush.netlify.app)

---

## 🔐 Authentication Flow (Core Feature)

This project implements secure JWT-based authentication:

1. User must register with a username, email, and password.
2. Password is securely hashed using **BCrypt** before storing in the database.
3. User must log in using the same registered credentials.
4. On successful login:
   - A **JWT Token** is generated and stored in `localStorage`
   - User is redirected to the **Dashboard** page
5. If a user tries to access protected pages without logging in:
   - Access is denied
   - User is redirected to the Login page

> ⚠️ This authentication uses **JWT tokens** with **Spring Security** for secure, stateless authentication.

---

## 🔹 Features

- ✅ User Registration with validation
- ✅ User Login with JWT Authentication
- ✅ Protected Routes (Dashboard, Add Expense)
- ✅ Add, Edit, and Delete Expenses
- ✅ Budget Management
- ✅ Monthly Expense Summary
- ✅ Visual Charts (Pie, Bar, Line)
- ✅ Expense Categories
- ✅ Dark Mode Support
- ✅ Responsive UI Design
- ✅ Toast Notifications

---

## 🔹 Technologies Used

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- Recharts
- React Toastify
- JavaScript (ES6)

### Backend
- Java Spring Boot
- Spring Security
- JWT (JSON Web Token)
- Spring Data JPA
- Hibernate
- MySQL
- HikariCP Connection Pool
- Maven

### Deployment
- **Netlify** — Frontend Hosting
- **Railway** — Backend Hosting
- **Railway MySQL** — Database Hosting

---

## 🔹 Project Structure

### Frontend
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
│   ├── pages/
│   │       AddExpense.jsx
│   │       Dashboard.jsx
│   │       Login.jsx
│   │       Register.jsx
│   │
│   ├── services/
│   │       BudgetService.js
│   │       ExpenseService.js
│   │
│   └── utils/
│           categoryColors.js
│           swalTheme.js
│
├── .env
└── package.json
```

### Backend
```
expense-tracker-backend/
├── src/
│   ├── main/
│   │   ├── java/com/et/expense_tracker_backed/
│   │   │   │   ExpenseTrackerBackedApplication.java
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── controller/
│   │   │   │   │       AuthController.java
│   │   │   │   └── dto/
│   │   │   │           LoginRequest.java
│   │   │   │           RegisterRequest.java
│   │   │   │
│   │   │   ├── config/
│   │   │   │       CorsConfig.java
│   │   │   │       JwtFilter.java
│   │   │   │       JwtService.java
│   │   │   │       SecurityConfig.java
│   │   │   │
│   │   │   ├── controller/
│   │   │   │       ExpenseController.java
│   │   │   │       FrontendController.java
│   │   │   │       UserController.java
│   │   │   │
│   │   │   ├── entity/
│   │   │   │       Expense.java
│   │   │   │       User.java
│   │   │   │
│   │   │   ├── enums/
│   │   │   │       Category.java
│   │   │   │
│   │   │   ├── exception/
│   │   │   │       GlobalExceptionHandler.java
│   │   │   │       ResourceNotFoundException.java
│   │   │   │
│   │   │   ├── repository/
│   │   │   │       ExpenseRepository.java
│   │   │   │       UserRepository.java
│   │   │   │
│   │   │   └── service/
│   │   │           ExpenseService.java
│   │   │           UserService.java
│   │   │
│   │   └── resources/
│   │           application.properties
│   │
│   └── test/
│       └── java/com/et/expense_tracker_backed/
│               ExpenseTrackerBackedApplicationTests.java
│
└── pom.xml
```

---

## 🔹 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Expenses
| Method | Endpoint | Description |
|---|---|---|
| GET | `/expenses/user/{userId}` | Get all expenses |
| POST | `/expenses/user/{userId}` | Add expense |
| PUT | `/expenses/{id}` | Update expense |
| DELETE | `/expenses/{id}` | Delete expense |
| GET | `/expenses/monthly-summary/{userId}` | Monthly summary |

### Budget
| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/budget/{userId}` | Get budget |
| PUT | `/users/budget` | Update budget |

---

## 🔹 How Authentication Works (Technical Overview)

- User registers → password hashed with **BCrypt** → stored in **MySQL**
- User logs in → credentials verified → **JWT Token** generated
- Token stored in `localStorage`
- Every protected API request sends token in `Authorization: Bearer <token>` header
- **JwtFilter** validates token on every request
- Invalid or missing token → **401 Unauthorized**

---

## 🔹 How to Run Locally

### Prerequisites
- Node.js (v18+)
- Java (v17+)
- MySQL
- Maven

### Backend Setup
```bash
git clone https://github.com/ankushbadgujar002/expense-tracker-backend.git
cd expense-tracker-backend
```

Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

Run:
```bash
./mvnw spring-boot:run
```
Backend runs on `http://localhost:8080`

### Frontend Setup
```bash
git clone https://github.com/ankushbadgujar002/expense-tracker-frontend.git
cd expense-tracker-frontend
```

Create `.env` file:
```
VITE_API_URL=http://localhost:8080
```

Run:
```bash
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## 🔹 Deployment

| Layer | Service | URL |
|---|---|---|
| ⚛️ Frontend | Netlify | [expense-tracker-ankush.netlify.app](https://expense-tracker-ankush.netlify.app) |
| 🍃 Backend | Railway | expense-tracker-backend-production-2a2f.up.railway.app |
| 🗄️ Database | Railway MySQL | Connected Internally |

---

## 🔹 Learning Outcomes

- Understanding JWT-based authentication
- Working with Spring Security
- Building REST APIs with Spring Boot
- Connecting React frontend with Spring Boot backend
- MySQL database design and JPA relationships
- Deploying full-stack applications for free
- CORS configuration between frontend and backend
- Environment variables in Vite (React)

---

## 🔹 Author

**Ankush Badgujar**
Information Technology Student
Frontend Web Developer (Fresher)
Full Stack Java Developer (Fresher)

- GitHub: [@ankushbadgujar002](https://github.com/ankushbadgujar002)

---

## 🔹 Disclaimer

This project is developed for learning and portfolio purposes. JWT secret keys and database credentials should always be stored securely using environment variables in production environments.

---

## 🔹 Future Enhancements

- 📧 Email verification on registration
- 🔑 Forgot password feature
- 📤 Export expenses to PDF/Excel
- 👤 User profile management
- 🔔 Budget limit notifications
- 📱 Mobile app version
