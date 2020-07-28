#FROM postgres:latest
# As of July 27, 2020, postgres:latest gives us Postgres 12.3. Details:
# (Debian 12.3-1.pgdg100+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 8.3.0-6) 8.3.0, 64-bit

FROM postgres:12.3

# Create temporary placeholder directory - example docker volume to share data outside container
RUN mkdir /home/datavolume
RUN date > /home/datavolume/test-file-created-by-postgres-Dockerfile.txt


##
#

