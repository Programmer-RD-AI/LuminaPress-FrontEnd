# LuminaPress FrontEnd

## Overview

LuminaPress FrontEnd is the frontend application for LuminaPress, developed using ReactJS and hosted on Firebase Hosting. This repository encompasses the user interface, dynamic news visualizations, and responsive design to ensure a seamless experience across web platforms.

## Project Structure

- **src/**: Source code for the application
  - **components/**: React components
  - **pages/**: React page components
  - **assets/**: Static assets like styles and images
  - **redux/**: Redux state management
- **public/**: Publicly accessible files
- **cypress/**: End-to-end tests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/LuminaPress/LuminaPress-FrontEnd.git
    ```
2. Navigate to the project directory:
    ```sh
    cd LuminaPress-FrontEnd
    ```
3. Install the dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Running the Application

To start the development server, use:
```sh
npm start
# or
yarn start
```
This will launch the application in your default web browser.

### Running Tests

To run end-to-end tests with Cypress, use:
```sh
npx cypress open
# or
yarn cypress open
```

### Building for Production

To create a production build, use:
```sh
npm run build
# or
yarn build
```

This will generate static files in the `dist` directory that can be deployed to Firebase Hosting.

## Contributing

Feel free to open issues and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [Apache-2.0 License](LICENSE).

## Contact

For any questions or feedback, please reach out to [your email or contact information].
