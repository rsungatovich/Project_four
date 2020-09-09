# Backend and API
Версия 1.0.0

## О проекте:
Практическая работа студента Яндекс.Практикум. 2020.

## Технологии:
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- Cookies and token

## Domain adress:

### API
api.chirikgaga.ga
www.api.chirikgaga.ga

### Статические файлы (отсутствуют)
chirikgaga.ga
www.chirikgaga.ga

### Публичный IP
http://84.201.179.76

## Запросы на сервер:

### Авторизация:

POST domain/signin

{
  mail: your@mail.com,
  password: min 5 symbols
}

### Создать пользователя:

POST domain/signup

{
  name: min 2 max 30 symbols,
  about: min 2 max 30 symbols,
  avatar: correct link,
  mail: uniq@mail.com,
  password: min 5 symbols
}

### Обновить данные пользователя:

PATH domain/users/me

{
  name: min 2 max 30 symbols,
  about: min 2 max 30 symbols
}

### Обновить аватар пользователя:

PATH domain/users/me/avatar

{
  avatar: correct link,
}

### Получить всеx пользователей:

Get domain/users

### Создать карточку:

POST domain/cards

{
  name: min 2 max 30 symbols,
  link: correct link
}

### Удалить карточку:

DELETE domain/cards/:id

### Получить все карточки:

GET domain/cards

### Поставить лайк карточке:

PUT domain/cards/:id/likes

### Удалить лайк карточке:

DELETE domain/cards/:id/likes

##### Все запросы сертифицированы протоколом https (кроме голого ip)
