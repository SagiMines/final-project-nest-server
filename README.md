# Work Shop - Server-Side Repository

<div align=center>
<a href='https://www.workshop-il.com/'>
<img src="./public/workshop-logo.png">
</a>
</div>

Welcome to the E-Commerce Work Tools Shop, a secure and efficient platform for purchasing workshop tools and equipment. This project combines React for the front-end, Node.js and NestJS for the back-end, and establishes a RESTful API to connect the client and server. The data is stored in a MySQL database, and robust security features have been implemented to ensure the safety of user data and transactions. The front-end is hosted on Netlify, while the back-end is hosted on Heroku.

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Security Features](#security-features)
- [Key Features](#key-features)
- [Deployment](#deployment)
- [Related](#related)

## Getting Started

Use the [Live Demo](https://www.workshop-il.com/)

**Or install locally:**

To get started with the Work Shop web application, follow these steps:

1. Clone this repository to your local machine.

```bash
git clone https://github.com/SagiMines/final-project-nest-server.git
cd final-project-nest-server
```

2. Install the necessary dependencies for the server.

```bash
npm install
```

3. Configure your environment variables for sensitive information - [Environment Variables Guidence](#environment-variables).

4. Run the application locally for development.

```bash
npm run start:dev
```

5. Continue to intall the [Client-Side](https://github.com/SagiMines/final-project) locally.

## Environment Variables

To run this project locally, you will need to add an `.env` file to the root of the project with the following environment variables included:

**General:**

`ORIGIN` - The route of the client-side (e.g localhost:3000).  
`PORT` - Port of the server (e.g 8000).

**Session:**

`SECRET` - Session's secret string for the hash validation (The longer the better).

**Database connection:**

`TYPE` - Type of your database (e.g mysql, postgres)  
`HOST` - Your database host.  
`DATABASE` - Your database name.  
`USER` - Your database user.  
`PASSWORD` - Your database password.

**User's Password Encryption/Decryption:**

`CRYPTO_SECRET` - CryptoJS library secret string for validating the password and applying encryption/decryption on it (The longer the better).

**Node Mailer Library:**

`MAILER_SERVICE` - Your Email Provider (e.g Gmail, Yahoo).  
`MAILER_USER` - Your Email address.  
`MAILER_PASS` - Your Email password.

## Usage

Once the project is set up and running (both client and server), users can:

- Browse and search for workshop tools and equipment.
- Add items to their cart and proceed to checkout.
- Create an account or log in for a personalized shopping experience.
- View order history and track the status of their orders.
- Enjoy a secure and user-friendly shopping experience.

## Overview

The E-Commerce Work Tools Shop is designed to provide an exceptional shopping experience for users seeking workshop tools and equipment. Whether you're a DIY enthusiast or a professional tradesperson, our platform offers a wide selection of high-quality products. Here's an overview of the key components of this project:

### Technology Stack

- **Front-end:** This project utilizes React for the front-end, creating an interactive and user-friendly shopping interface. React's component-based architecture makes it easy to manage and update the user interface.

- **Back-end:** The back-end of the platform is powered by Node.js and NestJS. Node.js ensures efficient server-side operations, while NestJS offers a structured and scalable application architecture.

- **Database:** User and product data is stored in a MySQL database, ensuring data integrity and reliability.

- **API:** The client-server communication is facilitated through a RESTful API, allowing for real-time updates on product availability, pricing, and order status.

### Security Features

To ensure the safety and confidentiality of user data and transactions, several security measures have been implemented:

- **Data Encryption:** Sensitive user information, such as login credentials and payment details, is encrypted using industry-standard encryption protocols, preventing unauthorized access.

- **Input Validation:** Robust input validation mechanisms prevent malicious input from users, protecting against common security threats like SQL injection and cross-site scripting (XSS).

- **Authorization and Authentication:** Strong user authentication and authorization mechanisms require users to verify their identity securely. Role-based access control ensures that only authorized individuals can perform specific actions.

- **Session Management:** User sessions are managed securely to prevent session hijacking or unauthorized account access. This includes features like automatic session timeouts and secure cookie handling.

## Key Features

- User-friendly and responsive front-end interface powered by React.
- A scalable and structured back-end architecture using Node.js and NestJS.
- Real-time updates on product availability, pricing, and order status through the RESTful API.
- Secure handling of sensitive information through encryption and input validation.
- Robust authentication and authorization mechanisms.
- Session management to protect user sessions from unauthorized access.
- MySQL database for reliable data storage.
- Deployment on Netlify (front-end) and Heroku (back-end) for easy access and scalability.

## Deployment

- **Front-end:** The front-end is hosted on Netlify, providing a reliable and scalable platform. Any changes pushed to the repository's main branch will trigger automatic deployments.

- **Back-end:** The back-end is hosted on Heroku, offering a cloud-based solution for the server. Heroku provides easy scalability and maintenance.

## Related

[Work Shop Client-Side Repository](https://github.com/SagiMines/final-project)
