# Use Python 3.12 as the base image
FROM python:3.12

# Set the working directory in the container to /app
WORKDIR /app

# Copy the requirements file and install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the entire project into the container
COPY . /app/

# Adjust the work directory to the Django project folder
WORKDIR /app/mettmedya

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Start server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
