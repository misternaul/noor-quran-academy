# Deployment Guide for Noor Quran Academy

This document outlines how to deploy the Noor Quran Academy website to Vercel and configure the required services.

## Prerequisites
- A GitHub account
- A Vercel account (free tier is fine)
- A Resend account for emails (optional but recommended)

## 1. Environment Variables

Create a `.env` file in the root of your project by copying `.env.example`:

```bash
DATABASE_URL="file:./dev.db" # During local dev. Change for production.
RESEND_API_KEY="re_123456789"
CONTACT_EMAIL="your-email@example.com"
FROM_EMAIL="onboarding@resend.dev"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
WHATSAPP_NUMBER="1234567890"
AUTH_SECRET="change-this-to-a-random-secure-string"
```

## 2. GitHub Setup

If Antigravity hasn't automatically pushed the code:
1. Go to GitHub and create a new repository called `noor-quran-academy`.
2. Run the following commands in your terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/misternaul/noor-quran-academy.git
   git push -u origin main
   ```

## 3. Database Setup (Vercel Postgres)

For production, SQLite won't work well on serverless Vercel due to read-only filesystems. We will use Vercel Postgres:
1. Go to Vercel and create a new Storage -> Postgres Database.
2. Link it to your Vercel Project.
3. This will automatically add `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, and `POSTGRES_URL_NON_POOLING` to your Vercel Environment Variables.
4. Update `prisma/schema.prisma` datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("POSTGRES_PRISMA_URL")
     directUrl = env("POSTGRES_URL_NON_POOLING")
   }
   ```
5. Commit and push the schema changes.

## 4. Resend Setup (Emails)

1. Go to [Resend.com](https://resend.com), create an account, and get an API Key.
2. Add your custom domain to Resend and configure the DNS records provided by Resend.
3. Add `RESEND_API_KEY`, `CONTACT_EMAIL`, and `FROM_EMAIL` to your Vercel project environment variables.

## 5. Vercel Deployment

1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository `noor-quran-academy`.
4. Open the **Environment Variables** section and add:
   - `AUTH_SECRET`: Generate a random long string.
   - `WHATSAPP_NUMBER`: Your business WhatsApp number.
   - `NEXT_PUBLIC_SITE_URL`: Your production URL.
   - Resend API keys.
5. Click **Deploy**.

## 6. Post-Deployment (Admin Initial Setup)

1. Go to `https://your-domain.com/admin`.
2. Login with the default password: `dafulat`
3. A security warning will appear on the dashboard.
4. Navigate to **Security** and change your password immediately.
5. Setup is complete!

## Troubleshooting

- **Admin Login fails**: Ensure `AUTH_SECRET` is set in Vercel.
- **Database errors**: Check that Prisma generated the client properly and `POSTGRES_PRISMA_URL` is set. You may need to run `npx prisma db push` against your production DB or run a build step script like `"postinstall": "prisma generate"`.
