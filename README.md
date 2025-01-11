
# **AI Chatbot with React, NestJS, and MongoDB**

### **Description**

This project is an AI-powered chatbot designed to:
- Answer simple questions.
- Take basic customer orders.
- Provide a responsive and intuitive interface for user interaction.

The application uses **React** for the frontend, **NestJS** for the backend, and **MongoDB** for data storage.

---

## **Features**

- **Frontend (React):**
  - Chat interface with real-time responses.
  - Responsive design for use on any device.
  - Axios for communicating with the backend.

- **Backend (NestJS):**
  - AI response handling.
  - Order management via a REST API.
  - Integration with MongoDB for persistent data storage.

- **Database (MongoDB):**
  - Storage for user queries and orders.
  - Easy scalability for future enhancements.

---

## **Prerequisites**

Before starting, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

---

## **Getting Started**

### **Backend Setup (NestJS)**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fherrera2190/susho-assistant
   cd your-repo/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the `backend` directory and include:
   
   ```
    #MONGO
    MONGO_URL=

    #Configuration Local LLAMA3.2
    #MODEL_LLM = llama3.2:latest
    #BASE_URL=http://localhost:11434/v1


    #Configuration OPENAI
    #MODEL_LLM = model-01
    #OPENAI_API_KEY=sk-proj-iseg3367aTt1DZ7WYKaag4VPheX...
    ```

4. **Start the server:**
   ```bash
   npm run start:dev
   ```

The backend will run on [http://localhost:3000](http://localhost:3000).

---

### **Frontend Setup (React)**

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the `frontend` directory and include:
   ```env
   VITE_API_URL=http://localhost:5173
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## **API Endpoints**

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| `POST` | `/postrecin-asistente/user-question`| Process a user question    |
| `POST` | `/postrecin-asistente/get-instruction`| This endpoint retrieves a command or instruction from the chatbot.|
| `POST` | `/postrecin-asistente/get-unknown-response`| This endpoint retrieves a response from the chatbot.|
| `POST` | `/orders`        | Create a new order         |
| `GET`  | `/products`      | Retrieve all orders        |
| `POST`  | `/products`      | Create a new product        |
| `DELETE`  | `/products/:id`      | Delete a product by id        |
| `PATCH`  | `/products/:id`      | Modify a  product by id        |
| `GET`  | `/seed`          | Populates the database with initial data|


## **Testing**

### **Backend Tests:**

- Run unit tests:
  ```bash
  npm run test
  ```


## **Additional Resources**

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
