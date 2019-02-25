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
    mail(to: @email, subject: 'Подписка на новости сайта poligon.info')
  end

  def goodbye_email(email)
    @email = email
    @url  = 'http://new.poligon.info'
    mail(to: @email, subject: 'Отказ от подписки на новости сайта poligon.info')
  end

  def catalogs_order_email(name, last_name, phone, email, company, address, booklet_ids, comment)
    @receiver  = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @name      = name
    @last_name = last_name
    @phone     = phone
    @email     = email
    @company   = company
    @address   = address
    @booklet_ids = booklet_ids
    @comment = comment
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'ЗАКАЗ КАТАЛОГОВ с сайта')
  end

  def farnell_order_email(name, email, company, phone, order)
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @name     = name
    @email    = email
    @company  = company
    @phone    = phone
    @order    = order
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Заказ FARNELL с сайта poligon.info')
  end

  def products_order_email(phone, order, subject, name = 'Не указано', email = 'Не указано', address = 'Не указано', requisites = 'Не указано')
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @subject = subject
    @phone    = phone
    @order    = order
    @name     = name
    @email    = email
    @address  = address
    @requisites = requisites
    if @subject == "fast_order"
      mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'БЫСТРЫЙ ЗАКАЗ с сайта')
    else
      mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'ЗАКАЗ с сайта')
    end
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
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'Задан вопрос / отправлен запрос с сайта poligon.info')
  end

  def request_question_or_analogue(contact)
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @contact = contact
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'ЗАЯВКА с сайта')
  end

  def request_conditions_email(name, phone, email,  message, quantity, product)
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @name     = name
    @phone    = phone
    @email    = email
    @message  = message
    @quantity = quantity
    @product = product
    mail(to: @receiver, bcc: 'robot@poligon.info', subject: 'ЗАПРОС ПРЕДЛОЖЕНИЯ с сайта')
  end

end
