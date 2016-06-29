Допустим(/^я успешно залогинился как сотрудник отдела маркетинга$/) do
  Group.create!(id: 3)
  @user3 = User.create!(
              name: "Третий тестовый чувак",
              email: "test3@test.ru",
              password: 'qwerqwer3',
              group_id: 3
              )
  visit new_user_session_path
  fill_in 'Email', with: @user3.email
  fill_in 'Пароль', with: @user3.password
  click_button("Войти")
  expect(page).to have_content text
  expect(page).to have_css('.user-bar')
end

Допустим(/^я нахожусь на странице с результатами поиска по названию товара$/) do
  visit advanced_search_path
  
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
