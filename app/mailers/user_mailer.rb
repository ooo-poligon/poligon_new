class UserMailer < ActionMailer::Base
  require 'mail'

  def welcome_email(email)
    @email = email
    @url  = 'http://new.poligon.info'

    mail = Mail.deliver do
      to      @email
      subject 'Подписка на новости сайта new.poligon.info'

      text_part do
        body 'hello'
      end

      html_part do
        content_type 'text/html; charset=UTF-8'
        body '<em><strong>hello</strong></em>'
      end
    end
  end

  def goodbye_email(email)
    @email = email
    @url  = 'http://new.poligon.info'

    mail = Mail.deliver do
      to      @email
      subject 'Отмена подписки на новости сайта new.poligon.info'

      text_part do
        body 'goodbye'
      end

      html_part do
        content_type 'text/html; charset=UTF-8'
        body '<em><strong>goodbye</strong></em>'
      end
    end
  end

end
