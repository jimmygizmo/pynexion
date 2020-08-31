# FROM dpage/pgadmin4:latest
# As of August 20, 2020, latest version of pgadmin4 according to pgadmin.org is 4.25.
# The version is not indicated in docker build output, but this does work: FROM dpage/pgadmin4:4.25

FROM dpage/pgadmin4:4.25


# Create temporary placeholder directory - example docker volume to share data outside container
#RUN mkdir /home/datavolume
#RUN date > /home/datavolume/test-file-created-by-pgadmin-Dockerfile.txt
# Don't have permission to create this dir. To use this test will need to fix that, find another location, etc.
# Writing this file just illustrates how the volume works, mostly relevant to using docker-compose.
# This is not needed and it might not be worth trying to solve the permission issue.
