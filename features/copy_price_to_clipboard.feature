# language: ru

Функционал: Копирование информации о цене товара в системный буфер обмена

  Для того чтобы иметь возможность в дальнейшем вставить информацию о цене товара
  в какой-либо документ, например, для отправки письма клиенту
  Как сотрудник отдела маркетинга или отдела продаж
  Я хочу при нажатии на определённую кнопку занести цену выбранного типа в буфер обмена

#  @javascript
#  Сценарий: Проверка от лица сотрудника отдела маркетинга
#    Допустим я успешно залогинился как сотрудник отдела маркетинга
#      К тому же я нахожусь на странице с результатами поиска по названию товара
#      И результат поиска имеет один или более найденных товаров
#      И найденным товарам сопоставлена таблица цен с кнопками для копирования в буфер обмена
#    Если я нажимаю на кнопку с нужным типом цены
#    То информация о цене помещается в буфер обмена
#      И я могу вставить её в любой документ в моей операционной системе
