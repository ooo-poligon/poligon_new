class UserMailer < ActionMailer::Base
  default from: 'mailer@poligon.info', to: { User.pluck(:email) }

  def welcome_email(user)
    @user = user
    @url  = 'http://new.poligon.info/feedback/confirm_subscription'
    mail(from: 'webmaster-poligon@yandex.ru', to: @user.email, subject: 'Подписка на новости сайта new.poligon.info')
  end

end
