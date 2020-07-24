# Ubuntu 20.04 is the latest LTS release as of the date of this Dockerfile: July 22, 2020
FROM ubuntu:20.04


# OS version details
RUN uname -a


# Update apt package information from all configured sources.
RUN apt-get -y update


# Install git.
# Git may be needed for some pip and source-code-built installs.
RUN apt-get -y install git


# Install curl for development, testing and troubleshooting
RUN apt-get -y install curl


# Fix tzdata interactive region prompt during install of software-properties-common
# Recently there is a problem where during this install at the point tzdata was just installed and
# is being configured using dpkg/debconf steps, where there will be an interactive prompt about the
# general "Region" to use. Setting this environment variable should fix this and is a good setting
# to have for any Dockerfile built for a debian-derived Linux image. No step in a Dockerfile can involve
# an interactive prompt requiring user input, whether or not they can time out automatically, which most cannot.
ARG DEBIAN_FRONTEND=noninteractive


# The following dependency install of software-properties-common
# is needed because it includes the apt-add-repository command which we run in a following step,
# but software-properties-common may also be needed for other installs as it a common dependency.
# This adds additional package repository management commands, among other things.
RUN apt-get -y install software-properties-common


# Obtain LSB details which may be needed for many common installs, such as for a full Postgres install for example.
# Make note of the "codename" in the output which may be important for some installs.
# This command comes included with software-properties-common, which is why it is run here.
RUN lsb_release -a


# Here is where we would install Python, but as of Ubuntu 20.04 you already get the latest
# Python 3 version of 3.8.2, the same as apt-get install python3.8 would provide, so no
# separate Python install is needed here, however, for future use, the steps to be used are
# below, currently disabled. # TODO: Rewrite some of the following:
# As recently as Ubuntu 18.04, you had to install Python separately and there were
# other Python installations coming from other installs, which caused some issues that needed fixes. It appears most
# of these issues have been resolved with the now-included Python and other newer packages. Some of the comments
# below are good to keep for future use under newer versions, but are not currently relevant since
# the OS includes the latest Python.


# As a prerequisite to installing Python, we must add a repository
#### RUN add-apt-repository -y ppa:deadsnakes/ppa  # NOT NEEDED UNDER UBUNTU 20.04


# NOTE: Be aware that an apt repository could provide a later subversion without notice.
# NOTE: This install only pins to the major version of 3.8 but does not pin the subversion.
# TODO: Look for a way to pin the exact subversion of Python 3.8.
# NOTE: apt is giving us 3.8.2 currently but the latest supported by Pyenv is 3.8.3 which would be our
# preferred choice. In fact, from Python.org, the latest available as of a few days ago is 3.8.5.
# RUN apt-cache policy python3  # Shows specifics of installed package and is supposed to show the
# available options but for options, always seems to show the same as what is installed.
# Install whatever 3.8 subversion apt is currently giving us:
#### RUN apt-get -y install python3.8  # NOT NEEDED UNDER UBUNTU 20.04


# RELATED TO PYTHON CONCERNS: Recently there was a conflict cause by a Python 3.6 which was installed
# prior to here by the install of software-properties-common which under Ubuntu 18.04 would install
# this additional Python 3.6 version of it's own which would cause a conflict with the python-pip3
# install that would come later. Still should keep an eye out for this issue or similar issues since
# we might have to install python-pip3.
# TODO: Update the above comment once it is seen there is no longer a pip3 conflict.


# Install pip3
# We will want 'pip' symlinked to the pip3 binary as well as 'python' symlinked to the 'python3.8' binary.
# In code, we will use shebangs that simply specify "/usr/bin/env python" etc. and will assume we are always
# aligned to a very recent version of Python 3 for all Python code.
RUN apt-get install -y python3-pip


# Create symlinks for 'pip' and 'python' to point to the binaries for 'pip3' and 'python3.8'
# Nothing currently exists for either planned symlink name so no removal steps are needed. The situation
# has been differnet for earlier versions of ubuntu, python, pip and software-properties-common which
# required a different approach to solve different issues. Now under unbuntu 20.04 and Python 3.8.2 included with
# it and the newer software-properties-common, the situation is better/cleaner.
RUN ln -s /usr/bin/python3.8 /usr/bin/python
RUN ln -s /usr/bin/pip3 /usr/bin/pip
# TODO: Consider making the 'python' symlink earlier on, before the pip install, and doing these symlinks in
# separate steps, with appriate comments near each step. Since the pip install involves python itself, it seems more
# logical to put the 'python' symlink in place before anything related to python is done, although it probably does
# not matter, it seems more correct to do it that way.


# Upgrade setuptools and pip
RUN pip install --upgrade setuptools
# Version upgrade was 45.2.0 -> 49.2.0
RUN pip install --upgrade pip
# Version upgrade was 20.0.2 -> 20.1.1


# Explicitly show which python and pip versions are installed and also what, if any modules are installed at this
# point, prior to customizing our Python environment any further:
RUN python -V
RUN pip -V
RUN pip freeze

# This ubuntu-supplied Python installation does have some modules already installed, obviously for use by the OS or
# other OS-included packages. The following is the baseline to be aware of:
#
# certifi==2019.11.28
# chardet==3.0.4
# dbus-python==1.2.16
# distro-info===0.23ubuntu1
# idna==2.8
# PyGObject==3.36.0
# python-apt==2.0.0
# requests==2.22.0
# requests-unixsocket==0.2.0
# six==1.14.0
# unattended-upgrades==0.1
# urllib3==1.25.8


# Install Nginx as our reverse-proxy layer in front of the actual web service.
# TODO: This will be installed, but initially not configured and not used as we will start out with just Flask
# serving directly. TODO: Later, configure Nginx appopriately, add it to startup control etc.
RUN apt-get -y install nginx
RUN nginx -v
# Current version we get is: 1.18.0


# Install supervisor
RUN apt-get -y install supervisor
# Current version we get is 4.1.0
# NOTE: This apt package will also install the (supervisor==4.1.0) Python module into
# the site-local the OS-included Python environment.


# Remove the default debian nginx config which allows the serving of files from /var/www/html
# This removes the symlink pointing to: /etc/nginx/sites-available/default
#### RUN rm /etc/nginx/sites-enabled/default
# TODO: Enable this step later when we set up Nginx properly.


# Create the main directory where most of the stuff for the REST Service will live
RUN mkdir /var/www/service


# Copy in the Python requirements file
# This will be the requirements file with the pinned versions, not the unpinned canonical requirements file.
COPY ./service-requirements.txt /var/www/service/service-requirements.txt
# NOTE: Occasionally, upgrades of all versions should be done and part of that process requires working with the
# canonical-service-requirements.txt file, so this normally disable command can be used at those times:
#### COPY ./canonical-service-requirements.txt /var/www/service/service-requirements.txt
# When this upgrading work is done and new versions test good, then 'pip freeze' should again be used to create a
# fresh (version-pinned) service-requirments.txt file. Don't forget to address special versions pinned for bug fixes!


# Install Python dependencies
RUN pip install -r /var/www/service/service-requirements.txt


# TODO: Rewrite these comments
# Show the pip freeze output at this point - then note which entries came from where since we had some in place
# already that came with Ubuntu and then at least one that apparently came with supervisor
RUN pip freeze
# Current pip freeze output - showing SOURCE of install:
#
# REQUIREMENTS: # aniso8601==8.0.0
# REQUIREMENTS: # attrs==19.3.0
#       UBUNTU: # certifi==2019.11.28
#       UBUNTU: # chardet==3.0.4
# REQUIREMENTS: # click==7.1.2
#       UBUNTU: # dbus-python==1.2.16
#       UBUNTU: # distro-info===0.23ubuntu1
# REQUIREMENTS: # Flask==1.1.2
# REQUIREMENTS: # flask-restplus==0.13.0
#       UBUNTU: # idna==2.8
# REQUIREMENTS: # itsdangerous==1.1.0
# REQUIREMENTS: # Jinja2==2.11.2
# REQUIREMENTS: # jsonschema==3.2.0
# REQUIREMENTS: # MarkupSafe==1.1.1
#       UBUNTU: # PyGObject==3.36.0
# REQUIREMENTS: # pyrsistent==0.16.0
#       UBUNTU: # python-apt==2.0.0
# REQUIREMENTS: # pytz==2020.1
#       UBUNTU: # requests==2.22.0
#       UBUNTU: # requests-unixsocket==0.2.0
#       UBUNTU: # six==1.14.0
# * SUPERVISOR: # supervisor==4.1.0
#       UBUNTU: # unattended-upgrades==0.1
#       UBUNTU: # urllib3==1.25.8
# REQUIREMENTS: # Werkzeug==0.16.0

# The above module list was validated for the sources of the modules and it can be seen that 12 of these
# came with the OS (Ubuntu 20.04) and 12 came as a result of the Python requirements.txt file, with one
# coming from the apt supervisor install, marked with (*).


# Copy the supervisor configuration file in and then symlink it from it's active location to there.
# This keeps things nicely organized in a central place.
COPY ./supervisor/supervisord.conf /var/www/service/supervisor/supervisord.conf
RUN ln -s /var/www/service/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf


# Copy the application files into place
COPY ./app.py /var/www/service/app.py

# Explose the port the Flask app is listening on. 5000 is Flask default.
EXPOSE 5000

# Start app without using supervisor
# Disabled, but kept here since it can be useful for testing and it illustrates the Flask entry point
#### CMD ["python", "/var/www/service/app.py"]

# Start supervisor, which will manage starting, auto-restarting the app, etc. according to configuration settings
CMD ["/usr/bin/supervisord"]


##
#

