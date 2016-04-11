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

end
