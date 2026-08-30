# Facebook Clone - Log in or Sign Up Page

This project is a responsive replica of the Facebook login and sign-up page. The page is designed to be visually similar to the original Facebook interface, using modern HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: The layout adjusts to various screen sizes for optimal user experience.
- **Accessibility**: Includes proper HTML structure for screen readers and keyboard navigation.
- **Clean UI**: Mimics the original Facebook UI with slight modifications for simplicity.

## File Structure

```
├── Media               # Media Folder
├── index.html          # Main HTML file
├── style.css           # CSS file for styling
├── main.js             # JavaScript file for interactions
├── package-lock.json   # Package lock json
├── package.json        # Package json
├── Readme.md           # Readme file
├── tailwind.config.js  # Tailwind config file
├── vite.config.js      # Vite config file
```

## Dependencies

- **Tailwind CSS**: Used for rapid styling and responsive design.
- **Font-Sans**: A font style applied for consistent typography.

## How to Use

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Open the `index.html` file in a web browser to view the page.

3. Modify the `style.css` file to customize the design.

4. If interactions are needed, add functionality in `main.js`.

## Description of Components

### Header Section
- Contains the Facebook logo and a short description of its purpose.

### Form Section
- Includes input fields for email and password.
- A login button and a link to recover a forgotten password.
- A button to create a new account.

### Footer Section
- Displays links to language options and quick navigation for additional services and terms.
- Includes social media links and legal disclaimers.

## How to Customize

1. **Update Logo**: Replace the SVG in the `<svg>` tag with your desired logo.
2. **Edit Footer Links**: Modify the `<ul>` tags in the footer section for custom links.
3. **Change Colors**: Edit the Tailwind CSS classes in `index.html` or add custom styles in `style.css`.

## Preview

![Facebook Clone Preview](/media/screenshot1.png)
![Facebook Clone Mobile Preview](/media/screenshot2.png)

## Future Enhancements

- Add interactivity to the form using JavaScript.
- Implement backend support for authentication.
- Include language translation features for the footer.