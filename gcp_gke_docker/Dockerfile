# Alping is a minimal container so we can keep the image size down for use on
# our minimal GCP GKE nodes which only have 10G of storage and 0.6G of RAM and
# which are pre-emptive. These nodes are the most affordable they can be.
# Alpine includes a minimal POSIX environment. Note that by default Alpine uses
# musl instead of glibc so some Python wheels won't work without forcing a 
# recompilation.
FROM python:3.7-alpine

MAINTAINER Jimmy Gizmo "redacted@redacted.com"

WORKDIR /app

# Taking advantage of layer caching so that Python dependencies are not
# re-dowloaded and installed every time we make source code changes and rebuild
# the container. We do this by copying requirements.txt to the container and
# then running pip against that, rather than just running pip against an
# external requirements.txt
COPY requirements.txt /
RUN pip install -r /requirements.txt

COPY app.py /app
# Was: COPY . /app - but I don't want anything but app.py in here.
# Google Cloud example uses: ADD . /app but really COPY is better.
# ADD also just does copy but really is more for downloading and or untarring
# files into the container. COPY is explicit and is simly just a COPY.

# Would this be better, as in more explicit? Is COPY . copying everything?
# We don't want or neede everything from this dir in the container.
#COPY app.py /app

EXPOSE 80

# CMD format which includes the ENTRYPOINT as the first argument
#CMD ["python", "app.py"]
# Or ENTRYPOINT can independently specify the executable and then CMD just
# specifies the arguments to pass.

ENTRYPOINT ["python"]
CMD ["app.py"]
# Equivalent to: CMD ["python", "app.py"]

# TODO: Determine whether or not this image allows calling 'python3' for
# python3 since this is what I am used to on my Mac which has v2 and v3
# together. It is more explicit and what my eye is used to. Since it is a
# Python 3 image, it might only have 'python' which is ok too.
# TODO: Try: ENTRYPOINT ["python3"]

# BUILD:
# docker build -t flask-hello-world .

# HOW THE VSCODE DOCKER PLUGIN RAN THIS SUCCESSFULLY AFTER THIS BUILD:
# docker run --rm -d -p 80:80/tcp flask-hello-world:latest

# See: https://cloud.google.com/container-registry/docs/quickstart

# docker tag flask-hello-world gcr.io/lunar-inn-244506/flask-hello-world:tag1

# docker push gcr.io/lunar-inn-244506/flask-hello-world:tag1

# To avoid possibly incurring charges for the container storage:
# gcloud container images delete gcr.io/[PROJECT-ID]/quickstart-image:tag1 --force-delete-tags

