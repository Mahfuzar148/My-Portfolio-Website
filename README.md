# Md. Mahfuzar Rahman Portfolio

A professional portfolio website scaffold built with React, Node.js, Express, and email-based contact delivery.

## Current structure

- React frontend in `client`
- Express backend in `server`
- One-page portfolio sections: hero, about, skills, projects, experience, and contact

## Personal details used

- Md. Mahfuzar Rahman
- University of Rajshahi
- Computer Science and Engineering
- Final semester / 8th semester

## Project highlights used

- Book Store App
- Bookstore Website
- YouTube Video Player

## Contact details used

- Email: [mahfuzar148@gmail.com](mailto:mahfuzar148@gmail.com)
- GitHub: [github.com/Mahfuzar148](https://github.com/Mahfuzar148)
- LinkedIn: [linkedin.com/in/md-mahfuzar-baa369262](https://www.linkedin.com/in/md-mahfuzar-baa369262)
- Phone: 01571319833

## Run plan

1. Install dependencies inside `client` and `server`.
2. Start the frontend with `npm run dev --prefix client`.
3. Start the backend with `npm run dev --prefix server`.
4. Copy your resume PDF into `client/public/resume.pdf` when you want a download link.

## GitHub + Netlify deploy

1. Push this repository to GitHub.
2. Connect the GitHub repo to Netlify.
3. Use the root `netlify.toml` config, which builds the frontend and publishes `client/dist`.
4. Every push to the connected branch will trigger a new Netlify deploy.

## Updating content

If you want to add a new skill, edit `client/src/data/portfolioData.js` and add the new entry to the `skills` array. After you push the change to GitHub, Netlify will rebuild the site and the update will appear on the live portfolio.

## Contact form on Netlify

The contact form sends messages through the Express API in local development or the Netlify Function in deployment.

For a free deploy-friendly setup, use `RESEND_API_KEY` in Netlify and keep `CONTACT_RECEIVER_EMAIL` set to your inbox. The function will use Resend automatically when the key is present.

If you prefer SMTP, set `SMTP_USER`, `SMTP_PASS`, `SMTP_HOST`, and `SMTP_PORT` instead. The function will fall back to SMTP when Resend is not configured.

## Backend API

- `GET /health`
- `GET /api/portfolio/summary`
- `POST /api/contact`

## Email setup

The contact form can send messages using Resend or SMTP. In Netlify, Resend is the simplest free option because the function can call it directly without keeping a server running.

If you want to use Gmail SMTP, create an App Password and use that in `SMTP_PASS`.

## Design direction

- Dark, premium, glass-style layout
- Strong hero section with clear calls to action
- Card-based sections for easy reading on desktop and mobile
