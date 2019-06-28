FROM python:3.7-alpine

MAINTAINER Jimmy Gizmo "redacted@redacted.com"

COPY requirements.txt /

RUN pip install -r /requirements.txt

COPY src/ /app
#COPY . /app  # From earlier version with no src dir


WORKDIR /app
#RUN pip install -r requirements.txt  # From earlier version, not using layer caching
#ENTRYPOINT ["python"]  # From earlier version

#CMD ["app.py"]  # From earlier version
CMD ["gunicorn", "-w 4", "main:app"]


# python:3.7-alpine is a minimal container, so we can keep the image size down
# Alpine ncludes a minimal POSIX environment. Note that by default Alpine uses musl instead of glibc
# so some Python wheels won't work without forcing a recompilation.

# If we just used: RUN pip install -r requirements.txt
# then every time we change source code and rebuild the container, the dependencies will be re-downloaded
# and re-installed. In order to take advantage of layer caching, we instead do this:
# COPY requirements.txt /
# RUN pip install -r /requirements.txt

# gunicorn - Python WSGI HTTP server for UNIX, obviously must come as part of Alpine.

# TODO: Does Apline support using uwsgi, nginx and flask together?

# To test:
# docker build -t simple-flask-app2:latest .
# docker run -d -p 5000:5000 simple-flask-app2

##
#
 
