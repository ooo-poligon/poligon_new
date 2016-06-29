Допустим(/^я зарегистрированный пользователь$/) do
  Group.create!(id: 1)
  @user = User.create!(
              name: "Просто тестовый чувак",
              email: "test@test.ru",
              password: 'qwerqwer',
              group_id: 1
              )
end

Допустим(/^я на странице 'Служебный вход ООО "ПОЛИГОН"'$/) do
  visit new_user_session_path
end

Если(/^ввожу правильные логин и пароль$/) do
  fill_in 'Email', with: @user.email
  fill_in 'Пароль', with: @user.password
end

Если(/^кликаю кнопку "([^"]*)"$/) do |text|
  click_button("Войти")
end

То(/^я должен увидеть уведомление "([^"]*)"$/) do |text|
  expect(page).to have_content text
end

То(/^я должен получить доступ к дополнительной верхней панели для зарегистрированных пользователей$/) do
  expect(page).to have_css('.user-bar')
end

Допустим(/^я успешно залогинился$/) do
  Group.create!(id: 1)
  @user = User.create!(
              name: "Просто тестовый чувак",
              email: "test@test.ru",
              password: 'qwerqwer',
              group_id: 1
              )
  visit new_user_session_path
  fill_in 'Email', with: @user.email
  fill_in 'Пароль', with: @user.password
  click_button("Войти")
  expect(page).to have_content text
  expect(page).to have_css('.user-bar')
end


Если(/^я кликаю ссылку "([^"]*)"$/) do |text|
  click_link("Выйти из служебного интерфейса")
end

То(/^я НЕ должен иметь доступ к дополнительной верхней панели для зарегистрированных пользователей$/) do
  expect(page).not_to have_css('.user-bar')
end
