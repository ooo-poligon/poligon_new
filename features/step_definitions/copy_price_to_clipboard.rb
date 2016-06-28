Допустим(/^я сотрудник отдела маркетинга или отдела продаж$/) do
  @user = User.new(group_id: 3, email: "test_user@poligon.info", encrypted_password: "00000000")
end

Допустим(/^я нахожусь на странице с результатами поиска по названию товара$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Допустим(/^в результатах поиска по складу присутствует хотя бы один товар$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Допустим(/^найденному товару сопоставлена таблица цен с кнопками для копирования в буфер обмена$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Когда(/^я нажимаю на кнопку с нужным типом цены$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Тогда(/^информация о цене помещается в буфер обмена$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Тогда(/^я могу вставить её в любой документ в моей операционной системе$/) do
  pending # Write code here that turns the phrase above into concrete actions
end
