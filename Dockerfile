FROM nginx:1.29-alpine
COPY index.html application.html *.css /usr/share/nginx/html/
