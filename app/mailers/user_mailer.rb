class UserMailer < ApplicationMailer
  default from: 'webmaster-poligon@yandex.ru'

  def welcome_email(user)
    @user = user
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Подписка на новости сайта new.poligon.info')
  end

end
