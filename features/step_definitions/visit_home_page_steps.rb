Допустим(/^я перешёл в браузере по адресу 0\.0\.0\.0:3000$/) do
  visit root_path
end

Тогда(/^я должен увидеть надпись 'Сайт компании ООО "([^"]*)"'$/) do |text|
  expect(page).to have_content text
end
