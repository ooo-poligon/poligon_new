class FeedbackController < ApplicationController
  require 'digest/md5'

  skip_before_action :verify_authenticity_token

  def mailing_list
  end

  def subscribe
    if params[:email] != '' && params.has_key?(:footer_agree)
      @email = params[:email]
      UserMailer.welcome_email(@email).deliver_now
      render "subscribe"
    elsif !params.has_key?(:footer_agree)
      flash[:error] = "Вы должны согласиться с политикой конфиденциальности!"
    else
      flash[:error] = "Поле адрееса не заполнено!"
    end
  end

  def unsubscribe
    unless params[:email] == ''
      @email = params[:email]
      UserMailer.goodbye_email(@email).deliver_now
      render "unsubscribe"
    else
      flash[:error] = "Поле адрееса не заполнено!"
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

  def send_request_or_question
    city    = params[:city]
    name    = params[:name]
    company = params[:company]
    email   = params[:email]
    phone   = params[:phone]
    message = params[:message]

    if email != ''
      UserMailer.request_question_email(city, name, company, email, phone, message).deliver_now
      respond_to do |format|
        format.html { redirect_to root_url, notice: 'Спасибо, мы получили Ваш запрос. В ближайшее время менеджер свяжется с Вами.'}
      end
    else
      flash[:error] = "Поле e-mail не заполнено!"
    end
  end

  def send_project_conditions
    name     = params[:name]
    phone    = params[:phone]
    email    = params[:email]
    message  = params[:message]
    quantity = params[:quantity]

    if email != ''
      UserMailer.request_conditions_email(name, phone, email,  message, quantity).deliver_now
      respond_to do |format|
        format.html { redirect_to root_url, notice: 'Спасибо, мы получили Ваш запрос. В ближайшее время менеджер свяжется с Вами.'}
      end
    else
      flash[:error] = "Поле e-mail не заполнено!"
    end
  end

end
