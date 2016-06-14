class UserMailer < ActionMailer::Base

  def test_email(subject)
    @subject = subject
    mail(to: "klekotnev@poligon.info", subject: 'Test')
  end

  def certificate_expiration_email(user, subject, certificate)
    @user    = user
    @subject = subject
    @certificate = certificate
    mail(to: user, subject: subject)
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
    mail(to: @receiver, bcc: 'webmaster@poligon.info', subject: 'Заказ каталогов с сайта new.poliogn.info')
  end

  def farnell_order_email(name, email, company, phone, order)
    @receiver = Setting.find_by(title: 'siteOrdersReceiver').text_value
    @name     = name
    @email    = email
    @company  = company
    @phone    = phone
    @order    = order
    mail(to: @receiver, bcc: 'webmaster@poligon.info', subject: 'Заказ FARNELL с сайта new.poliogn.info')
  end

end
