# Deployment Steps for Sarmad Saeed Portfolio

## Quick public testing link - Netlify Drop

1. Extract the portfolio ZIP on your computer.
2. Open https://app.netlify.com/drop
3. Drag the extracted portfolio folder onto the Netlify Drop page.
4. Wait for Netlify to upload and build the site.
5. Netlify will show a live testing URL like `https://your-site-name.netlify.app`.
6. Open the URL and test the welcome screen, CV downloads, mobile menu, contact links, and LinkedIn link.

This is the fastest way to get a public test link without GitHub.

## Professional deployment - GitHub + Netlify

1. Create or log in to GitHub.
2. Create a public repository called `sarmad-portfolio`.
3. Extract the ZIP and upload these files to the repository root:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `favicon.svg`
   - `Sarmad_Saeed_CV.pdf`
   - `Sarmad_Saeed_CV.docx`
   - optional compatibility files: `Sarmad_Saeed_Professional_Resume.pdf`, `Sarmad_Saeed_Professional_Resume.docx`
4. Go to https://netlify.com and sign in with GitHub.
5. Click `Add new site` -> `Import an existing project`.
6. Select GitHub and choose the `sarmad-portfolio` repository.
7. Leave build command empty because this is a static HTML/CSS/JS site.
8. Leave publish directory as `/` or blank, depending on Netlify's screen.
9. Click `Deploy site`.
10. Rename the generated site URL in Netlify settings if needed.

## GitHub Pages option

1. Upload the portfolio files to a GitHub repository.
2. Open repository `Settings`.
3. Open `Pages`.
4. Source: `Deploy from a branch`.
5. Branch: `main`.
6. Folder: `/root`.
7. Save.
8. Your link will look like `https://YOUR_USERNAME.github.io/sarmad-portfolio/`.

## Vercel option

1. Log in to https://vercel.com with GitHub.
2. Import the portfolio repository.
3. Keep default settings for a static site.
4. Click `Deploy`.

## Cloudflare Pages option

1. Log in to https://pages.cloudflare.com.
2. Connect the GitHub repository.
3. Select the portfolio repository.
4. Leave build command empty.
5. Set output directory to `/`.
6. Deploy.

## Final checks after deployment

- Welcome screen displays correctly.
- Continue button opens the portfolio.
- Mobile menu opens and closes correctly.
- CV PDF download works.
- CV DOCX download works.
- LinkedIn link opens in a new tab.
- Email and phone links work.
- No page section is blank after refresh.
- Site is tested on mobile and desktop.
