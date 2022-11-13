# Бригада **raptors**

### Склад бригади:

- [Макарицький Олег](https://github.com/olegmak02)
- [Головенко Олександр](https://github.com/sashaholovenko)
- [Рудик Микола](https://github.com/Destaby)

---
### Вказівки до лабораторної роботи №1:

- Билд образу
```
docker build -t raptors -f ./Lab1/Dockerfile ./Lab1
```

- Запуск контейнера
```
docker run -d -p 80:80 raptors
```

### Вказівки до лабораторної роботи №2:

- Файл конфігурації vagrant знаходиться в папці "./Lab2"

- Завантажити vmware_desktop плагін
```
vagrant plugin install vagrant-vmware-desktop
```

- Запуск віртуальної машини
```
cd ./Lab2
vagrant up --provider vmware_desktop
```

### Вказівки до лабораторної роботи №3:

- Билд образу
```
docker build -t raptors:Lab3 --no-cache -f ./Lab3/Dockerfile ./Lab3
```

- Запуск контейнерів
```
cd Lab3 && yarn all-up
```

- Запуск локально
```
cd Lab3 && yarn all-start
```
