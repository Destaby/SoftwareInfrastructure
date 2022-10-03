## Бригада ___no-name___

1. Макарицький Олег
2. Рудик Микола


### Lab1

- Билд образу
```
docker build -t my_nginx -f ./Lab1/Dockerfile ./Lab1
```

- Ран контейнера
```
docker run -d -p 80:80 my_nginx
```
