Допустим(/^я успешно залогинился как сотрудник отдела маркетинга$/) do
  Category.create!(id: 1, title: 'TELE', parent: 0)
  Currency.create!(id: 1, title: 'EUR')
  Vendor.create!(title: 'TELE')
  #Serie.create!(title: 'GAMMA')
  ProductKind.create!(id: 1, title: 'без определения')
  Product.create!(title: 'G4', price: 1.0, category_id: 1)

  Group.create!(id: 2)
  Setting.create!(title: 'addCBR', kind: 'PriceCalcSettings', text_value: '5')
  @user = User.create!(
              name: "Просто тестовый чувак",
              email: "test@test.ru",
              password: 'qwerqwer',
              group_id: 2
              )
  visit new_user_session_path
  fill_in 'Email', with: @user.email
  fill_in 'Пароль', with: @user.password
  click_button("Войти")
  expect(page).to have_content "Вход в систему выполнен."
  expect(page).to have_css('.user-bar')
end

Допустим(/^я нахожусь на странице с результатами поиска по названию товара$/) do
  visit root_path
  fill_in 'Расширенный поиск', with: 'G4'
  click_button 'Найти'
  expect(page).to have_content "Поиск по складу"
  #puts Product.all[0].title
end

Допустим(/^результат поиска имеет один или более найденных товаров$/) do
  expect(page).not_to have_content "Поиск по складу не дал результатов"
end

Допустим(/^найденным товарам сопоставлена таблица цен с кнопками для копирования в буфер обмена$/) do
  expect(page).to have_content('EUR')
end

Когда(/^я нажимаю на кнопку с нужным типом цены$/) do
  click_button("EUR")
end

Тогда(/^информация о цене помещается в буфер обмена$/) do
  all("global-zeroclipboard-flash-bridge").first
end

Тогда(/^я могу вставить её в любой документ в моей операционной системе$/) do
  all(".search_form").first.send_keys [:control, 'v']
  expect(all(".search_form").first.value).to have_content('евро c НДС. Наличие на складе:')
end
