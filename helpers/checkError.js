module.exports = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Запрос неверно сформирован' });
    return;
  }
  if (err.message === 'Неправильные почта или пароль') {
    res.status(401).send({ message: err.message });
    return;
  }
  if (err.message === 'Нет доступа к действию') {
    res.status(403).send({ message: err.message });
    return;
  }
  if (err.message === 'Ничего не найдено') {
    res.status(404).send({ message: err.message });
    return;
  }
  if (err.code === 11000) {
    res.status(409).send({ message: 'Данные уже существуют' });
    return;
  }
  res.status(500).send({ message: 'На сервере произошла ошибка' });
};
