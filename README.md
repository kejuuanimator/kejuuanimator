# Your Name Portfolio Template

A clean, editable personal portfolio template built with HTML, CSS, and JavaScript. Replace every placeholder with your own name, work, experience, contact details, and links.

## Pages

- `index.html` — the main portfolio page, introduction, and featured projects.
- `all-project.html` — a project archive with gallery and list views. It works directly in a local server or as a static file; Vercel also supports `/all-project` through an explicit rewrite. Select a project to view its details.

## Features

- Responsive layout for desktop and mobile devices.
- CSS and SVG animations and visual elements.
- Project gallery with gallery and list view options.
- Project detail dialog supporting images, descriptions, categories, years, and roles.
- Render toggle in project details for switching between the final render and the viewport render, when both are available.
- Custom favicon for website branding.

## Project Structure

```text
.
├── .vscode/
│   └── settings.json
├── README.md
├── index.html
├── all-project.html
├── vercel.json
├── assets/
│   ├── favicon.svg
│   ├── images/
│   │   ├── profile/
│   │   └── projects/
│   └── videos/
├── css/
│   ├── style.css
│   └── projects.css
├── js/
│   ├── main.js
│   └── projects.js
```

## Running Locally

Open `index.html` in a browser, or run the folder using an extension such as Live Server in Visual Studio Code. The internal navigation uses relative HTML paths, so it works locally. On Vercel, the main page uses the root domain, while `/all-project` is also explicitly routed to `all-project.html`.

## Adding Projects

Project content on the `all-project.html` page uses `data-*` attributes on gallery cards and list rows. When adding a project, update both views to keep the details, category, and status consistent. Replace the example categories, project titles, descriptions, roles, dates, image paths, and source URLs with your own.

Use `data-video` for the final render and `data-video-viewport` for an optional viewport render. When both are present, the project detail dialog shows a Final render / Viewport toggle. Leave `data-video-viewport` empty to hide the toggle for projects that only have one version.

Use `data-status="upcoming"` for unfinished projects. Other projects are counted as completed. Set `data-source` to the available source URL, or leave it empty if the source has not been shared. If a project has an image, set `data-image` to its image path.

The project summary on `index.html` is intentionally kept brief. Update the total and selected project counts whenever the archive changes.

## Deployment

This website can be deployed as a static site using Vercel. If the GitHub repository is connected to a Vercel project, pushing to the deployment branch will automatically trigger a new deployment.
