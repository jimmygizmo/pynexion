# FROM postgres:latest
# As of August 20, 2020, postgres:latest gives us Postgres 12.4. Details:
# PostgreSQL 12.4 (Debian 12.4-1.pgdg100+1) on x86_64-pc-linux-gnu

FROM postgres:12.4

# Create temporary placeholder directory - example docker volume to share data outside container
RUN mkdir /home/datavolume
RUN date > /home/datavolume/test-file-created-by-postgres-Dockerfile.txt
