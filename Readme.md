# Express Firebase Project

This project is a simple Express application that integrates with Firebase for user authentication and implements CRUD operations for appointments. Only authenticated users with a JWT token can access the appointment endpoints.

## Features

1. User Registration and Login using Firebase Email and Password Authentication
2. Integration with JWT for token-based authentication
3. CRUD operations for Appointments
4. Authentication required for accessing appointment endpoints

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your/repo.git // copy link from above 
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project on the [Firebase console](https://console.firebase.google.com).
   - Enable the Authentication service and choose the Email/Password sign-in method.
   - Obtain your Firebase project configuration, including the API key, auth domain, etc.
   - Update the `.config.js` file with your Firebase configuration details:

     ```bash
      databaseURL: your_database_uri,
      authDomain: your_auth_domain,
     ```

4. Generate a secret key:

   - Create a secret key for signing JWT tokens.
   - Update the `.env` file with your secret key:

     ```
     SECRET=your_secret_key
     ```

5. Obtain the Firebase service account JSON file:

   - Go to the Firebase project settings on the console.
   - Navigate to the Service Accounts tab.
   - Click on "Generate new private key" to download the JSON file.
   - Save the downloaded `firebase.json` file in the project root directory.

## Usage

1. Start the application:

   ```
   npm start
   ```

2. Access the API endpoints through `http://localhost:5000/api`.

## API Endpoints

### User Endpoints

- **POST** `/register`: Create a new user account.
   - Request Body:
    - `email`: Email address of the user (e.g., `demo@gmail.com`)
    - `password`: Password for the user account (e.g., `Demo@123`)
- **POST** `/login`: Authenticate a user and obtain a JWT token.
    - Request Body:
    - `email`: Email address of the user (e.g., `demo@gmail.com`)
    - `password`: Password for the user account (e.g., `Demo@123`)

### Appointment Endpoints 

- **GET** `/appointments`: Get all appointments.
- **GET** `/appointments/:id`: Get a specific appointment by ID.
- **POST** `/appointments`: Create a new appointment.
    - Request Body:
    - `date`: Date of the appointment
    - `time`: Time of the appointment
    - `userId`: ID of the user associated with the appointment
    - `status`: Status of the appointment
- **PUT** `/appointments/:id`: Update an existing appointment.
    - Request Body:
    - `date`: Updated date of the appointment
    - `time`: Updated time of the appointment
    - `userId`: Updated ID of the user associated with the appointment
    - `status`: Updated status of the appointment
- **DELETE** `/appointments/:id`: Delete an appointment.

## Demo Account

For testing purposes, you can use the following demo account:

- Email: `demo@gmail.com`
- Password: `Demo@123`

Please note that this is a demo account and should not be used for production purposes.

## Environment Variables

The following environment variables are used in this project:

- `SECRET`: Your Secret.


Please make sure to set these variables in the `.env` file before running the application.

## Firebase Service Account JSON

To enable the integration with Firebase, you need to obtain the Firebase service account JSON file and save it as `firebase_auth.json` in the project root directory. This file contains the necessary credentials for the Firebase SDK to authenticate and access the Firebase services.for testing porpuse attech firebase.json file 
update for firebase.json file in 
```bash
#update path under config.js

const serviceAccount = require('Your file path');


```

## License

This project is licensed under the [MIT License](LICENSE).
