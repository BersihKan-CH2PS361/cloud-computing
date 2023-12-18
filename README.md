# Cloud Computing
This repository contains the codebase for our cloud computing part. Below are the guidance and essential information regarding the documentation, dependencies, and steps to replicate the project.

## Documentation
### Endpoints
* Authentications
  ```
  POST /auth/register-user
  ```
  ```
  POST /auth/register-collector
  ```
  ```
  POST /auth/login
  ```
  ```
  POST /auth/logout
  ```
* Users
  ```
  GET /users/:id
  ```
  ```
  PUT /users/update-profile/:id
  ```
* Collectors
  ```
  GET /collectors/:id
  ```
  ```
  GET /collectors/all
  ```
  ```
  PUT /collectors/update-profile/:id
  ```
  ```
  PUT /collectors/update-id/:id
  ```
* Orders
  ```
  GET /orders/:id
  ```
  ```
  GET /orders/history-user/:id
  ```
  ```
  GET /orders/history-collector/:id
  ```
  ```
  GET /orders/orderdata-user/:id
  ```
  ```
  GET /orders/orderdata-collector/:id
  ```
  ```
  GET /orders/pickup
  ```
  ```
  GET /orders/arrived
  ```
  ```
  GET /orders/delivering
  ```
  ```
  GET /orders/delivered
  ```
  ```
  POST /orders/create/:id
  ```
  ```
  PUT /orders/update-status/:id
  ```
* Facilities
  ```
  GET /facility/search-user/:id
  ```
  ```
  GET /facility/search/:id
  ```
  ```
  PUT /facility/update-facility-name/:id
  ```
* Contents
  ```
  GET /contents
  ```
  ```
  GET /contents/:id
  ```
  ```
  POST /contents/create
  ```
  ```
  PUT /contents/update/:id
  ```
  ```
  DELETE /contents/delete/:id
  ```

### Relational Model
![relational_model.png](https://github.com/BersihKan-CH2PS361/cloud-computing/blob/main/diagrams/relational-model.png) <br>
As shown in the diagram, the tables and their relationship details are used for database creation.

### Cloud Architecture
![cloud_architecture.png](https://github.com/BersihKan-CH2PS361/cloud-computing/blob/main/diagrams/cloud-archtecture.png) <br>
As shown in the architecture diagram, the project used the following cloud services for its infrastructure:
* __Cloud Storage__, is used for storing SQL scripts.
* __Cloud SQL (MySQL)__, is used for storing application data and managing structured data for the application.
* __Cloud Run__, is used for scalability, manageability, and cost-effective API deployment.

## Dependencies
The project used the following dependencies:
* Express.js
* mysql
* bycript
* jsonwebtoken
* uuid
* dotenv
* body-parser
* cors
* nodemon

## Replicating Steps
Below are the steps to replicate this project.
### Step 1: Clone Repository
Clone this repository to your local machine in terminal, or if you prefer in cloud environment then use Shell.
```bash
git clone https://github.com/BersihKan-CH2PS361/cloud-computing.git
cd cloud-computing
```
### Step 2: Install Dependencies
For local environment, perform necessary installation steps.
```bash
npm install
```
### Step 3: Create Database
Create the database according to the relational model above using MySQL or Cloud SQL.
### Step 4: Configuration
Set up the environment configuration by creating a `.env` file and adding the database connection variables.
### Step 5: Run
1. Start the server using the following command.
   ```bash
   npm start
   ```
2. Open https://localhost:3000/
### Step 6: API Test
Test the API using a testing application such as [Postman](https://www.postman.com/).
### Step 7: Deploy to the Cloud
1. Enable Cloud Build API and Cloud SQL Admin API.
2. Clone the repository in the Shell.
3. Set up environment configuration.
4. Deploy the application using the following command.
   ```bash
   gcloud run deploy --source .
   ```
5. Open https://<your_application_url> to access your deployed application.
