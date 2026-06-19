# RoboSpark: AI & Robotics Summer Workshop

RoboSpark is a full-stack premium landing page and reservation system designed for a 4-week AI & Robotics Summer Cohort for kids aged 8–14. It follows startup-grade design principles (inspired by Stripe, Linear, Vercel, and Apple) characterized by rich typography, massive spacing, subtle ambient blurs, and interactive Framer Motion micro-animations.

---

## Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (with `@tailwindcss/vite` configuration)
- **Animations**: Framer Motion
- **Form Handling & Validation**: React Hook Form + Zod resolver
- **Icons**: Lucide React + React Icons (Font Awesome)
- **Notifications**: Sonner Toasts
- **Utilities**: clsx, tailwind-merge

### Backend
- **Platform**: Node.js + Express.js
- **Database**: MongoDB Atlas + Mongoose ODM
- **Security & Logging**: Helmet, CORS, Morgan logger, Cookie Parser
- **Validators**: Express Validator

---

## Folder Structure

```text
gema/
├── backend/
│   ├── config/
│   │   └── db.js                  # Database connection handler
│   ├── controllers/
│   │   └── enquiryController.js   # API logic for processing submissions
│   ├── middlewares/               # Express request middleware
│   ├── models/
│   │   └── Enquiry.js             # Mongoose schema mapping
│   ├── routes/
│   │   └── enquiryRoutes.js       # Express route mapping
│   ├── validators/
│   │   └── enquiryValidator.js    # Payload inputs validation rules
│   ├── server.js                  # Main server listener
│   └── package.json               # Backend dependency package
│
└── frontend/
    ├── index.html                 # Main entry template with SEO keywords
    ├── package.json               # Frontend dependencies
    ├── vite.config.js             # Vite configuration with Tailwind integration
    └── src/
        ├── App.jsx                # Router endpoints mapping
        ├── main.jsx               # React core startup & global Toasters
        ├── index.css              # Custom styling definitions
        ├── components/
        │   ├── layout/
        │   │   ├── Navbar.jsx     # Sticky navbar with mobile toggle and scroll targets
        │   │   └── Footer.jsx     # Modern brand presentation footer
        │   ├── ui/
        │   │   ├── BackgroundBlur.jsx   # Ambient gradient glow blobs
        │   │   ├── BackgroundGrid.jsx   # Radial grid overlay pattern
        │   │   ├── Badge.jsx            # Pill-badge presentation items
        │   │   ├── Button.jsx           # Form submissions & action CTA triggers
        │   │   ├── Container.jsx        # Grid layout wrapper
        │   │   ├── GlassCard.jsx        # Glassmorphism container blocks
        │   │   └── SectionTitle.jsx     # Dynamic heading presentation layouts
        │   └── sections/
        │       ├── Hero/
        │       │   ├── Hero.jsx         # Header title + interactive floating items
        │       │   └── FloatingCard.jsx # Floating card with cursor-based parallax
        │       ├── WorkshopSnapshot/
        │       │   ├── WorkshopSnapshot.jsx # Overview layout
        │       │   └── SnapshotCard.jsx     # Individual glowing detail card
        │       ├── Benefits/
        │       │   ├── Benefits.jsx     # Value propositions layout
        │       │   └── BenefitCard.jsx  # Value card layouts
        │       ├── Roadmap/
        │       │   ├── Roadmap.jsx      # Week-by-week program structure
        │       │   └── TimelineItem.jsx # Single curriculum list item
        │       ├── FAQ/
        │       │   ├── FAQ.jsx          # Interactive accordions layout
        │       │   └── FAQItem.jsx      # Single glass accordion toggle card
        │       └── Registration/
        │           └── Registration.jsx # Validated contact enquiry form
        ├── pages/
        │   └── Home.jsx                 # Aggregated Landing Page
        └── services/
            ├── api.js                   # Axios base client wrapper
            └── enquiryApi.js            # POST submission wrapper
```

---

## Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas Connection String)

### 1. Setup Backend
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables in a `.env` file (see [Environment Variables](#environment-variables)).
4. Run the development server (runs on `http://localhost:5000` by default):
   ```bash
   npm run dev
   ```

### 2. Setup Frontend
1. Open another terminal and navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server (runs on `http://localhost:5173` by default):
   ```bash
   npm run dev
   ```

---

## Environment Variables

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```
*Note: If `MONGODB_URI` is omitted, the server automatically attempts to connect to local database `mongodb://127.0.0.1:27017/robospark`.*

### Frontend (`frontend/.env`)
Optional: Create a `.env` file in the `frontend/` directory to customize the API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Documentation

### Register Workshop Enquiry

- **Endpoint**: `/api/enquiry`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Alex Mercer",
    "email": "alex.mercer@gmail.com",
    "phone": "9876543210"
  }
  ```

#### Request Validation Rules (JSON)
- **Name**: Must be between 2 and 50 characters.
- **Email**: Must be a valid email format.
- **Phone**: Must be exactly 10 digits.

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "Registration Successful"
}
```

#### Error Response (`400 Bad Request`)
```json
{
  "success": false,
  "errors": [
    {
      "type": "field",
      "value": "123",
      "msg": "Phone number must be exactly 10 digits",
      "path": "phone",
      "location": "body"
    }
  ],
  "message": "Phone number must be exactly 10 digits"
}
```

---

## Verification & Screenshots

| Section | UI Presentation | Micro-interactions |
| :--- | :--- | :--- |
| **Hero** | Ambient glowing grid, premium header title | Cards float infinitely and displace dynamically in response to mouse moves |
| **Snapshot** | 5 cards detailing Cohort metadata | Clean icon badges, border glow and elevation on cursor hover |
| **Why Join** | 6 grid-aligned value propositions cards | Subtle vertical lift and shadow expansion on focus |
| **Curriculum** | Left-aligned vertical line timeline layout | Week indicators scroll-reveal and pulse node animation |
| **FAQ Accordions** | 4 glass card panels | Accordions slide down/up smoothly, chevrons rotate dynamically |
| **Registration Form**| Validation-aware inputs + submit loading states | Instant client validation, server fallback toast notifications |

---

## Future Improvements
1. **Interactive Curriculum View**: Expandable syllabus sections with downloadable brochures.
2. **Online Payment Integration**: Stripe/Razorpay payment processors integration directly from form completion.
3. **Student Dashboard**: Virtual workspace portal where kids submit daily simulator tasks and view ratings.
