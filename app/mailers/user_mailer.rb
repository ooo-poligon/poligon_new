class UserMailer < ActionMailer::Base

  def test_email(subject)
    @subject = subject
    mail(to: "robot@poligon.info", subject: 'Test')
  end

  def certificate_expiration_email(user, subject, certificate)
    @user    = user
    @subject = subject
    @certificate = certificate
    mail(to: user, bcc: "robot@poligon.info", subject: subject)
  end

  def welcome_email(email)
    @email = email
    @url  = 'http://new.poligon.info'
    mail(to: @email, subject: 'Подписка на новости сайта new.poliogn.info')
  end

  def goodbye_email(email)
    @email = email
    @url  = 'http://new.poligon.info'
    mail(to: @email, subject: 'Отказ от подписки на новости сайта new.poliogn.info')
  end

  def catalogs_order_email(name, email, company, address, catalogue)
    @receiver  = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @name      = name
    @email     = email
    @company   = company
    @address   = address
    @catalogue = catalogue
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Заказ каталогов с сайта new.poliogn.info')
  end

  def farnell_order_email(name, email, company, phone, order)
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @name     = name
    @email    = email
    @company  = company
    @phone    = phone
    @order    = order
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Заказ FARNELL с сайта new.poliogn.info')
  end

  def products_order_email(phone, order, name = 'Не указано', email = 'Не указано', address = 'Не указано', requisites = 'Не указано')
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @phone    = phone
    @order    = order
    @name     = name
    @email    = email
    @address  = address
    @requisites = requisites
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Заказ товаров с сайта new.poliogn.info')
  end

  def request_question_email(city, name, company, email, phone, message)
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @city     = city
    @name     = name
    @company  = company
    @email    = email
    @phone    = phone
    @message  = message
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Задан вопрос / отправлен запрос с сайта new.poliogn.info')
  end

  def request_conditions_email(name, phone, email,  message, quantity)
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @name     = name
    @phone    = phone
    @email    = email
    @message  = message
    @quantity = quantity
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Задан вопрос / отправлен запрос с сайта new.poliogn.info')
  end

end
