# Simple Products and Variants Management Web App

Design : Ant-Design

Credit to : https://github.com/altence/lightence-ant-design-react-template

Stack : Frontend (ReactJS, Vite) + Backend (Python, Flask)

## How to Start with Docker

### Environment

All environment variables are defined in docker-compose.yml

run this command project root dir :

```bash
docker compose up --build
```

Try it in browser :

backend : http://localhost:8081/

frontend : http://localhost:8082/

## How to Start Locally

### Environment

Create .env file on each of backend and frontend directly based on the defined environments in docker-compose.yml

### Backend :

```python
cd backend
pip install -r requirements.txt

python run.py
```

### Frontend :

```javascript
cd frontend
npm install

npm run dev
```
