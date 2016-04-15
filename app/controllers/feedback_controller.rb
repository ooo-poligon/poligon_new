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

  def confirm_subscription
    @email = params[:confirm_email]
    md5_email = Digest::MD5.hexdigest(@email.downcase)
    gb = Gibbon::Request.new(api_key: ENV["MAILCHIMP_KEY"])
    @list_id = ENV["MAILCHIMP_LIST"]
    gb.lists(@list_id).members(md5_email).upsert(
        body:
        {
          email_address: @email,
          status: "subscribed"
        })
  end

  def confirm_unsubscription
    @email = params[:confirm_email]
    md5_email = Digest::MD5.hexdigest(@email.downcase)
    gb = Gibbon::Request.new(api_key: ENV["MAILCHIMP_KEY"])
    @list_id = ENV["MAILCHIMP_LIST"]
    gb.lists(@list_id).members(md5_email).upsert(
        body:
        {
          email_address: @email,
          status: "unsubscribed"
        })
  end

  def request_catalogs
  end

end
