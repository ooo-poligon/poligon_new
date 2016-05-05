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

  def booklets
  end

  def catalogs_order
    unless params[:name] == '' or
           params[:email] == '' or
           params[:company] == '' or
           params[:address] == '' or
           params[:catalogue].size == 0

      @name      = params[:name]
      @email     = params[:email]
      @company   = params[:company]
      @address   = params[:address]
      @catalogue = params[:catalogue]

      UserMailer.catalogs_order_email(@name, @email, @company, @address, @catalogue).deliver_now
      render "catalogs_order"
    else
      flash[:error] = "Не заполнены все необходимые поля!"
      render "booklets"
    end
  end

  def farnell
  end

  def farnell_order
    unless params[:name] == '' or
           params[:email] == '' or
           params[:company] == '' or
           params[:phone] == '' or
           params[:order] == ''

      @name    = params[:name]
      @email   = params[:email]
      @company = params[:company]
      @phone   = params[:phone]
      @order   = params[:order]

      UserMailer.farnell_order_email(@name, @email, @company, @phone, @order).deliver_now
      render "farnell_order"
    else
      flash[:error] = "Не заполнены все необходимые поля!"
      render "farnell"
    end
  end

end
