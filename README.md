<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <img src="https://i.imgur.com/CwsSYmB.png"></img>
    <h1>Bookify - Reservation Booking System - Backend</h1>
    <p>
        A <strong>production-grade</strong> reservation booking system with various features, including a scalable backend with NestJS microservices, Kubernetes deployment on Google Cloud, JWT authentication, Stripe payment integration, email notifications, and RabbitMQ message processing. Implemented CI/CD pipelines and production Dockerfiles for each microservice.
    </p>
    <p>
    <strong><a href="https://github.com/nitzanto/Bookify-Frontend">For the Frontend click here</a></strong>
        </p>
    <strong><a href="https://github.com/nitzanto/Restauranteer">For the Restauranteer API (AWS Lambda Function) click here</a></strong>
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
    
<h2>API Paths</h2>

<p>Here are the main API endpoints with examples of how to use them:</p>

<h3>Reservations Resource</h3>
<strong>This resource can be accessed only by authenticated users</strong>
<ul>
<li><p>Retrieve all of the existing reservations for resturants with assigned users</p></li>
<pre><code>GET /reservations</code></pre>

<li><p>Retrieve a specific reservation:</p></li>
<pre><code>GET /reservations/:reservation_id</code></pre>

<li><p><u></u>Create a new reservation (the userId will be automatically assigned):</p></li>
<pre><code>POST /reservations</code></pre>
<pre><code>Example request body:
{
	"startDate": "02-01-2021",
	"endDate": "02-01-2023",
	"restaurantId": "f24e3777-f167-4920-9652-15fefcd73b23",
	"reservationDate": "02-01-2023 Monday 18:00 PM",
	"charge": {
		"amount": 199,
		"card": {
			"cvc": "413",
			"exp_month": 12,
			"exp_year": 2027,
			"number": "4242 4242 4242 4242"
		}
	}
}
</code></pre>

<li><p>Update reservation's information:</p></li>
<pre><code>PUT /reservations/:reservation_id</code></pre>
<pre><code>Example request body:
{
   "startDate": "02-01-2021",
   "endDate": "02-01-2023",
   "reservationDate": "02-01-2023 Monday 18:00 PM",
}
</code></pre>

<li><p>Delete a reservation:</p></li>
<pre><code>DELETE /reservations/:reservation_id</code></pre>
<br></br>
<h3>Auth Resource</h3>
<p>
    By logging in you receive a JWT Token which is signed by the server and an HTTP cookie is returned and can access the rest of the resources.
</p>
<li><p>Logging into account:</p></li>
<pre><code>POST /auth/login</code></pre>
<pre><code>Example request body:
{
	"email": "bookify1@gmail.com",
	"password": "Password123!"
}
</code></pre>
<li><p>Logging out account:</p></li>
<pre><code>POST /auth/logout</code></pre>

<h4>Users Resource (Included within Auth Resource)</h4>
<li><p>Sign-Up / Create a new user for the Bookify App:</p></li>
<pre><code>POST /users</code></pre>
<pre><code>Example request body:
{
	"email": "bookify1@gmail.com",
	"password": "Password123!"
}</code></pre>
</ul>
</body>
</html>
