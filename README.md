# Crypto Stats API – KoinX Internship Submission

A backend system to fetch and analyze cryptocurrency stats, built as part of the **KoinX Backend Internship Assignment (May 2025)**.

This project is structured into two main services:

- **api-server**: Exposes API endpoints for latest crypto stats and standard deviation
- **worker-server**: Periodically fetches data and updates the database

---

## Features

- Fetch real-time cryptocurrency data from [CoinGecko API](https://www.coingecko.com/en/api)
- Store data in MongoDB
- Calculate standard deviation of past N entries
---

## Tech Stack
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Axios
---

## Folder Structure

```
crypto/
├── api-server/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── middleware/
│       ├── models/
│       ├── services/
│       ├── utils/
│       └── index.js
├── worker-server/
│   └── index.js
├── .env.example
└── README.md

```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/RiteshBiradar/crypto.git
cd crypto
```

### 2. Install Dependencies

```bash
cd api-server && npm install
cd ../worker-server && npm install
```
### 3. Setup .env Files
Create a .env file in both api-server/ and worker-server/ based on the provided .env.example.
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/crypto
```
## Running the Project

### Run MongoDB Locally
Make sure MongoDB is running on your system or use MongoDB Atlas.
### Start API Server

```bash
cd api-server
npm start
```
### Start Worker Server

```bash
cd worker-server
npm start
```
## API Endpoints 
Base URL: `http://localhost:3000`

### `GET /stats` 
- Return the latest data about the requested cryptocurrency.
```bash
http://localhost:3000/api/v1/stats?coin=bitcoin
```
### `GET /deviation` 
- Return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database..
```bash
http://localhost:3000/api/v1/deviation?coin=bitcoin
```
