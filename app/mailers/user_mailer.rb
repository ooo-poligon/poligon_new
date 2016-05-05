class UserMailer < ActionMailer::Base

  def welcome_email(email)
    @email = email
    @url  = 'http://new.poligon.info'
    mail(to: @email, subject: 'Hello!!!')
  end

  def goodbye_email(email)
    @email = email
    @url  = 'http://new.poligon.info'
    mail(to: @email, subject: 'Goodbye!')
  end

  def catalogs_order_email(name, email, company, address, catalogue)
    @name      = name
    @email     = email
    @company   = company
    @address   = address
    @catalogue = catalogue
    mail(to: 'webmaster@poligon.info', subject: 'Заказ каталогов с сайта new.poliogn.info')
  end

  def farnell_order_email(name, email, company, phone, order)
    @name    = name
    @email   = email
    @company = company
    @phone   = phone
    @order   = order
    mail(to: 'webmaster@poligon.info', subject: 'Заказ FARNELL с сайта new.poliogn.info')
  end

end
