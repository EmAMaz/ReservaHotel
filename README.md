
# 🏨 ReservaHotel API

RESTful API for managing a room reservation system, whether within a hotel or a hotel complex. It implements a clean architecture design with layers of Use Cases and Repositories, ensuring modularity and easy testing through Dependency Inversion (DI) and Mocks.




## 🛠️ Technologies Used

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express , TypeScript, TypeORM

**Auhtentication:** JWT (JSON Web Tokens) + BCrypt

**Testing:** Vitest


## 🚀 Installation

Follow these steps to get the API up and running in your local environment.

1 Clone the Repository
```bash
  git clone https://github.com/EmAMaz/ReservaHotel.git
  cd ReservaHotel
```

1.1- Install Dependencies
```bash
  npm install
```
1.2 Configure Environment Variables
```bash
    PORT=****
    DB_HOST=****
    DB_PORT=****
    DB_USER=****
    DB_PASSWORD=****
    DB_DATABASE=****
```
1.3 Run the Application - Development Mode
```bash
npm run dev
```
## 🧪 Test Execution

This project uses Vitest for unit testing. The tests are designed to verify the business logic in the Use Case layer, using Mocks to isolate dependencies from the Repository.

```bash
  npm run vitest
```

