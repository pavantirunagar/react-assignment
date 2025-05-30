# 📘 Profile Management App

A fully functional **React + TypeScript** application that allows users to **create, edit, delete, and view profiles**, with state management using **Redux Toolkit**, routing using **React Router**, UI built with **Material-UI (MUI)**, and persistent storage using **LocalStorage**.  
API integration is handled with **Axios**, and environment-based configuration uses **Vite**.

---

## 🚀 Live Demo

**🔗 Deployed on Vercel:** [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

---

## 🧩 Features

- 🔄 Create, edit, delete, and view user profiles
- ✅ Form validation (name, email, optional age)
- 💾 Profile data saved in LocalStorage
- 🌐 REST API integration (Mock API or JSON Server)
- 🌍 Environment-based API switching using `.env`
- ⚛️ Global state with Redux Toolkit
- 🧭 Routing with React Router (`/profile`, `/profile-form`, `404`)
- 🧑 User name shown in the navbar
- 🎨 Styled with Material UI (MUI)
- 🔔 Error handling and fallback UI

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── navBar.tsx
│   ├── noProfileFound.tsx
│   ├── ProfileFormFields.tsx
│   ├── profileFormPage.tsx
│   ├── ProfilePage.tsx
├── constants/
│   └── index.ts
├── hooks/
│    └── useProfileFunctions.tsx
├── redux/
│   ├── profileSlice.ts
│   └── store.ts
├── services/
│   ├── api.ts
│   └── profileServices.ts
├── types/
│   └── profileTypes.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🧪 Tech Stack

| Tool            | Description                                  |
|------------------|----------------------------------------------|
| React            | Frontend library                             |
| TypeScript       | Type safety                                  |
| Redux Toolkit    | Global state management                      |
| React Router     | Page routing                                 |
| MUI (Material UI)| UI components and theming                    |
| Axios            | HTTP client                                  |
| Vite             | Fast dev server and bundler                  |
| LocalStorage     | Client-side persistence                      |

---

## 🧾 Pages & Routing

| Path              | Description                           |
|-------------------|---------------------------------------|
| `/profile-form`   | Create or edit a profile              |
| `/profile-form/:id` | Pre-fill and update profile         |
| `/profile`        | View the current profile              |
| `*`               | 404 Not Found fallback                |

---

## 🧠 Redux State Example

```ts
{
  profile: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    age: 25
  },
}
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/pavantirunagar/react-assigment
cd profile-management-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=https://your-mockapi-url.com
```

> ⚠️ Replace with your own MockAPI/JSON Server endpoint.

---

### 4. Run the project

```bash
npm run dev
```

> App runs at your local host

---

### 5. Build for production

```bash
npm run build
```

---

### 6. Deploy to Vercel

- Push your code to GitHub
- Connect your repo to [https://vercel.com](https://vercel.com)
- Set your environment variables in the Vercel dashboard

---

## ✅ Assignment Requirements Covered

- [x] Create/update profile via form
- [x] View profile via API or localStorage
- [x] Profile not found message with Create button
- [x] Redux for profile + API state
- [x] Environment config with `.env`
- [x] Material UI used for styling
- [x] Proper routing and 404 handling
- [x] Vercel deployment

---

## 🙌 Author

**pavan tirunagar** – [GitHub](https://github.com/pavantirunagar)  
For any issues or suggestions, feel free to open an issue or pull request.
#   r e a c t - a s s i g n m e n t 
 
 #   r e a c t - a s s i g n m e n t 
 
 #   r e a c t - a s s i g n m e n t 
 
 