class UserMailer < ApplicationMailer
  default from: 'webmaster-poligon@yandex.ru'

  def welcome_email(user)
    @user = user
    @url  = 'http://new.poligon.info'
    mail(to: @user.email, subject: 'Подписка на новости сайта new.poligon.info')
  end

end
