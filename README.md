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
