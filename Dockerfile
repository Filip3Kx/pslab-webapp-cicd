FROM python:3.6.1
RUN mkdir /app
WORKDIR /app
COPY .. .
RUN pip install --upgrade pip
RUN pip install virtualenv
RUN virtualenv venv
RUN /bin/bash -c "source venv/bin/activate"
RUN pip install -r requirements.txt
WORKDIR /app/backend
CMD ["gunicorn", "app:app"]