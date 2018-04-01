Допустим(/^я нахожусь на сайте$/) do
  visit root_path
end

Допустим(/^я нахожусь не на домашней странице сайта$/) do
  visit sitemap_path
end

Когда(/^я кликаю по логотипу компании в верхнем левом углу сайта$/) do
  find('.logo').click
end

Когда(/^я кликаю по пункту меню "([^"]*)" в верхней навигационой панели сайта$/) do |link_name|
  visit feedback_booklets_path       if link_name == "PDF-материалы"
  visit company_contacts_path        if link_name == "Контакты"
  visit company_about_path           if link_name == "О нас"
  visit offers_index_path            if link_name == "Sale"
  # all('.dropdown').first.click       if link_name == "Поиск"
end

Тогда(/^я должен увидеть заголовок "([^"]*)"$/) do |text|
  expect(page).to have_content text
end

Тогда(/^под ним я должен увидеть картинку с подписью "([^"]*)"$/) do |text|
  expect(page).to have_content text
end

Тогда(/^картинку с подписью "([^"]*)"$/) do |text|
  expect(page).to have_content text
end

Тогда(/^картинку с подписью "([^"]*)"ПОЛИГОН\\"([^"]*)"$/) do |text1, text2|
  text = text1 + text2
  expect(page).to have_content text
end

Тогда(/^я должен увидеть ниспадающую панель с текстовым полем$/) do
  expect(page).to have_selector('.search_form', visible: true)
end

Тогда(/^я должен увидеть ниспадающую панель со списком элементов меню$/) do
  expect(page).to have_selector('#information-links', visible: true)
end

Тогда(/^эта панель должна содержать пункт меню "([^"]*)"$/) do |text|
  expect(page).to have_selector("a", text: text)
end

Тогда(/^это поле должно содержать текст по умолчанию "([^"]*)"$/) do |text|
  expect(page).to have_selector("input[placeholder=#{ text }]")
end
