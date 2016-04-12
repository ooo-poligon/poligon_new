class FeedbackController < ApplicationController
  require 'digest/md5'

  def mailing_list
  end

  def subscribe
    unless params[:email] == ''
      @email = params[:email]
      UserMailer.welcome_email(@email).deliver_now
      render "subscribe"
    else
      flash[:error] = "Поле адрееса не заполнено!"
      render "mailing_list"
    end
  end

  def unsubscribe
    unless params[:email] == ''
      @email = params[:email]
      UserMailer.goodbye_email(@email).deliver_now
      render "unsubscribe"
    else
      flash[:error] = "Поле адрееса не заполнено!"
      render "mailing_list"
    end
  end

  def confirm_unsubscription
    @list_id = "4d4dac6fe6"
    @email = params[:confirm_email]
    if User.find_by(email: @email, subscribe: 1)
      user = User.find_by(email: @email, subscribe: 1)
      user.subscribe  = 0
      user.save
      gb1 = Gibbon::Request.new(api_key: "82052d77f02ab151e93eb7916fbf0ee8-us13")
      md5_email = Digest::MD5.hexdigest(@email.downcase)
      gb1.lists(@list_id).members(md5_email).update(
        body:
        {
          status: "unsubscribed"
        })
    else
      render "subscriber_not_exist"
    end
  end

  def confirm_subscription
    @email = params[:confirm_email]
    @list_id = "4d4dac6fe6"
    if User.find_by(email: @email, subscribe: 1)
      render "subscriber_exist"
    elsif User.find_by(email: @email, subscribe: 0)
      user = User.find_by(email: @email, subscribe: 0)
      user.subscribe  = 1
      user.save
      gb = Gibbon::Request.new(api_key: "82052d77f02ab151e93eb7916fbf0ee8-us13")
      gb.lists(@list_id).members.create(
        body:
        {
          email_address: @email,
          status: "subscribed"
        })
    else
      user = User.new
      user.email = @email
      user.group_id = 1
      user.subscribe  = 1
      user.password = "00000000"
      user.save
      gb = Gibbon::Request.new(api_key: "82052d77f02ab151e93eb7916fbf0ee8-us13")
      gb.lists(@list_id).members.create(
        body:
        {
          email_address: @email,
          status: "subscribed"
        })
    end
  end

  def request_catalogs
  end

  def quick_order
  end

  def message
  end

end
