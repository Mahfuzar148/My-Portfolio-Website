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

The contact form is configured for Netlify Forms in the frontend, so submitted messages will be captured by the live site without needing the Express backend.

After the site is deployed, open the Netlify dashboard and add a form notification so new submissions are emailed to `mahfuzar148@gmail.com`.

## Backend API

- `GET /health`
- `GET /api/portfolio/summary`
- `POST /api/contact`

## Email setup

The contact form sends messages to your email using SMTP when `SMTP_USER` and `SMTP_PASS` are set in your server `.env` file. If SMTP is not configured, the browser opens your mail app with the message prefilled.

If you want to use Gmail, create an App Password and use that in `SMTP_PASS`.

## Design direction

- Dark, premium, glass-style layout
- Strong hero section with clear calls to action
- Card-based sections for easy reading on desktop and mobile
