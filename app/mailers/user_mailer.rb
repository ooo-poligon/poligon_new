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
    mail(to: @email, subject: 'Подписка на новости сайта new.poligon.info')
  end

  def goodbye_email(email)
    @email = email
    @url  = 'http://new.poligon.info'
    mail(to: @email, subject: 'Отказ от подписки на новости сайта new.poligon.info')
  end

  def catalogs_order_email(name, last_name, email, company, address, booklet_ids, comment)
    @receiver  = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @name      = name
    @last_name = last_name
    @email     = email
    @company   = company
    @address   = address
    @booklet_ids = booklet_ids
    @comment = comment
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Заказ каталогов с сайта new.poligon.info')
  end

  def farnell_order_email(name, email, company, phone, order)
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @name     = name
    @email    = email
    @company  = company
    @phone    = phone
    @order    = order
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Заказ FARNELL с сайта new.poligon.info')
  end

  def products_order_email(phone, order, name = 'Не указано', email = 'Не указано', address = 'Не указано', requisites = 'Не указано')
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @phone    = phone
    @order    = order
    @name     = name
    @email    = email
    @address  = address
    @requisites = requisites

    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Заказ товаров с сайта new.poligon.info')
  end

  def request_question_email(city, name, company, email, phone, message, product)
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @city     = city
    @name     = name
    @company  = company
    @email    = email
    @phone    = phone
    @message  = message
    @product  = product
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Задан вопрос / отправлен запрос с сайта new.poligon.info')
  end

  def request_question_or_analogue(contact)
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @contact = contact
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Задан вопрос / отправлен запрос с сайта new.poligon.info')
  end

  def request_conditions_email(name, phone, email,  message, quantity, product)
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @name     = name
    @phone    = phone
    @email    = email
    @message  = message
    @quantity = quantity
    @product = product
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Задан вопрос / отправлен запрос с сайта new.poligon.info')
  end

end
