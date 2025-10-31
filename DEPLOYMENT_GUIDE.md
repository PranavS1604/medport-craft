# Portfolio Deployment & Editing Guide

This guide explains how to deploy your portfolio to Vercel and edit content without touching code.

## 🚀 Deploying to Vercel

### Step 1: Connect to GitHub
1. In Lovable, click the **GitHub button** in the top right
2. Connect your GitHub account if you haven't already
3. Click **"Push to GitHub"** to create a new repository
4. Your code will be automatically pushed to GitHub

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in (or create an account)
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Find and select your portfolio repository from GitHub
5. Vercel will auto-detect the settings (Vite project)
6. Click **"Deploy"**
7. Wait 2-3 minutes for the deployment to complete
8. Your site will be live at `yourproject.vercel.app`

### Step 3: Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain and follow the DNS instructions

## ✏️ Editing Content Without Code

All portfolio content is stored in a single JSON file that you can edit directly on GitHub.

### Method 1: Edit on GitHub (Easiest)

1. **Go to your GitHub repository**
   - Navigate to `public/content.json`

2. **Click the pencil icon** (Edit this file)

3. **Edit the content** - Update any text you want:
   ```json
   {
     "personal": {
       "name": "Your Name Here",
       "title": "Your Title",
       "email": "your@email.com",
       ...
     }
   }
   ```

4. **Scroll down and click "Commit changes"**

5. **Automatic Deployment**
   - Vercel automatically detects the change
   - Your site rebuilds in 1-2 minutes
   - Changes are live!

### What Can You Edit?

#### Personal Information
- Name, title, subtitle
- Email, phone, location
- Bio/About text

#### Education
- Degree, institution
- Graduation year
- Achievements list

#### Certifications
- Add/remove certifications
- Update organization names
- Change dates and descriptions

#### Research Projects
- Project titles
- Abstracts and highlights
- Co-authors and dates

#### Skills & Interests
- Technical skills list
- Soft skills list
- Areas of interest

### Method 2: Edit Locally (Advanced)

1. Clone your repository:
   ```bash
   git clone https://github.com/yourusername/your-portfolio.git
   cd your-portfolio
   ```

2. Edit `public/content.json` in any text editor

3. Push changes:
   ```bash
   git add public/content.json
   git commit -m "Update portfolio content"
   git push
   ```

4. Vercel auto-deploys within 1-2 minutes

## 🎨 Visual Editing in Lovable (Before Deployment)

Before pushing to GitHub, you can use Lovable's **Visual Edits** feature:

1. Click the **Visual Edits** button in Lovable
2. Click on any text element on the page
3. Edit directly (text, colors, fonts)
4. Click **Save** to apply changes
5. Then push to GitHub when ready

## 📋 Content Editing Tips

1. **Keep JSON Valid**: Don't break the JSON structure (commas, quotes, brackets)
2. **Preview Before Commit**: GitHub shows a preview of your changes
3. **Use JSON Validator**: If unsure, paste your JSON into [jsonlint.com](https://jsonlint.com)
4. **Backup First**: Download `content.json` before making large changes
5. **Test Locally**: Run `npm run dev` locally to preview changes before pushing

## 🔄 Updating Multiple Times

Every time you commit changes to `public/content.json` in GitHub:
- Vercel automatically detects the change
- Rebuilds your site (1-2 minutes)
- Deploys the updated version
- No manual intervention needed!

## 🆘 Troubleshooting

**Site not updating after editing?**
- Wait 2-3 minutes for Vercel to rebuild
- Check Vercel dashboard for build status
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

**JSON errors?**
- Validate your JSON at jsonlint.com
- Check for missing commas or quotes
- Revert to a previous GitHub commit if needed

**Need to restore old version?**
- Go to GitHub repository
- Click "History" on content.json
- View old versions and copy content back

## 🎯 Best Practices

1. **Make small changes**: Edit one section at a time
2. **Test first**: Preview changes in Lovable before pushing
3. **Commit often**: Small, frequent updates are easier to track
4. **Use descriptive commit messages**: "Update contact email" vs "Update file"
5. **Keep backups**: Download content.json occasionally as backup

## 📱 Editing on Mobile

You can edit content.json directly from GitHub mobile app:
1. Install GitHub app on your phone
2. Navigate to your repository
3. Edit content.json
4. Commit changes
5. Site updates automatically!

---

## Need Help?

- **Lovable Docs**: [docs.lovable.dev](https://docs.lovable.dev)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Guide**: [docs.github.com](https://docs.github.com)

Your portfolio is now fully editable without ever touching the code! 🎉
