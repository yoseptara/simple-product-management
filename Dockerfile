# Dockerfile
FROM python:3.9-alpine

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r backend/requirements.txt

EXPOSE 5000

RUN chmod +x /app/wait-for.sh
RUN chmod +x /app/backend/start.sh

CMD ["python", "backend/run.py"]

