<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <img src="https://i.imgur.com/CwsSYmB.png"></img>
    <h1>Bookify - Reservation Booking System</h1>
    <p>
        A <strong>production-grade</strong> reservation booking system with various features, including a scalable backend with NestJS microservices, Kubernetes deployment on Google Cloud, JWT authentication, Stripe payment integration, email notifications, and RabbitMQ message processing. Implemented CI/CD pipelines and production Dockerfiles for each microservice.
    </p>
    <h3>Software Engineering Principles</h3>

<ul>
    <li><strong>SOLID Principles:</strong> The project follows the SOLID principles, ensuring that the codebase is modular, maintainable, and scalable.</li>
    <li><strong>DRY (Don't Repeat Yourself):</strong> The codebase emphasizes the DRY principle by minimizing code duplication. Reusable components and services are employed to avoid redundancy and maintain code consistency.</li>
    <li><strong>Data Validation:</strong> Data validation is implemented at multiple levels of the application to ensure data integrity and security. Input validation is performed on the server-side to prevent invalid data from being processed.</li>
</ul>
    <h2>Key Features</h2>
    <ul>
        <li>Scalable backend architecture</li>
        <li>Event Driven Architecture</li>
        <li>Creation of a monorepo which houses multiple NestJS applications (Micro-services) within a single repository.</li>
        <li>Creation of a common library for code sharing across multiple applications.</li>
        <li>Implementation of end-to-end (E2E) testing framework with Jest for NestJS microservices.</li>
        <li>Microservices implementation using NestJS</li>
        <li>Integration with Stripe for payment processing</li>
        <li>Email notifications using nodemailer and Gmail</li>
        <li>Data persistence with MongoDB</li>
        <li>Asynchronous message processing with RabbitMQ</li>
        <li>Automated CI/CD pipeline with CloudBuild</li>
        <li>Application running on Google GKE</li>
        <li>Load balancer provision for high availability</li>
        <li>Creation of production-ready Dockerfiles and package.json for each microservice.</li>
    </ul> 
    <h2>Bookify - Architecture</h2>
    <p>
      <img src="https://i.imgur.com/if9GmVc.png" />
    </p>
     <h2>Planned Features</h2>
    <ul>
        <li>Deploying the application on AWS</li>
        <li>Implementing an automated CI/CD on AWS with CodePipeLine</li>
        <li>Extra User Roles - e.g. admin</li>
        <li>Changing the Database Module to use MySQL with TypeORM</li>
        <li>gRPC</li>
        <li>GraphQL</li>
    </ul> 
</body>
</html>
