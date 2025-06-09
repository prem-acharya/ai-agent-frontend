# Frontend Setup Info

Demo available — see the full walkthrough in the [LinkedIn post.](https://www.linkedin.com/feed/update/urn:li:activity:7332498633633718274/)

## About the Project

Weekend Project: **Integrate Google Meet and Tasks With LLM**

This frontend is part of a full-stack AI Agent that helps automate real-world tasks using natural language prompts. Built with **Next.js**, **Tailwind CSS**, and **Shadcn UI**, it connects to a powerful backend powered by LLMs.

Users can:
- Log in using **Clerk** with Google OAuth
- Interact with the agent via a user interface
- Schedule Google Meet
- Create tasks and get information (like time/weather)

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS, Shadcn/UI
- **Auth**: Clerk + Google OAuth

---

## Google Auth Setup (via Clerk)

To enable Google sign-in via Clerk:

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to **Social Connections** > **Google**
3. Add your **Google OAuth credentials**:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
4. Use the following scopes (for Google Meet + Tasks access):

- https://www.googleapis.com/auth/tasks
- https://www.googleapis.com/auth/calendar.events


## Setup & Run (Next.js)

1. **Install dependencies**

   ```bash
   npm install
    ````
   
2.  **Setup the environment variables** (`.env.example`)

3. **Run dev server**

   ```bash
   npm run dev
   ```

Your frontend will be available at [http://localhost:3000](http://localhost:3000)


## 📬 Contact

For issues or collaboration on the frontend UI/auth layer:

* GitHub Issues
* Pull Requests welcome
