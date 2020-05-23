# Build docker image

docker build -t unit-conversion-check .

#run docker image

docker run -d -p 3000:3000 --name unit-conversion-check-container unit-conversion-check