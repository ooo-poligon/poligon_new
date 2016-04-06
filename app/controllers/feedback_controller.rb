class FeedbackController < ApplicationController
  require 'digest/md5'

  def mailing_list
  end

  def subscribe
    @list_id = "5565a3ae33"
    @email = params[:email][:address]
    unless User.find_by(email: @email, subscribe: 1)
      @user = User.new
      @user.email = @email
      @user.subscribe  = 0
      @user.save

      respond_to do |format|
        if @user.save
          # Сказать UserMailer отослать приветственное письмо после сохранения
          UserMailer.welcome_email(@user).deliver_now #.deliver_later

          format.html { redirect_to(@user, notice: 'User was successfully created.') }
          format.json { render json: @user, status: :created, location: @user }
        else
          format.html { render action: 'subscribe' }
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end


      gb = Gibbon::Request.new
      gb.lists(@list_id).members.create(
        body:
        {
          email_address: @email,
          status: "subscribed"
        })
    else
      render "subscriber_exist"
    end
  end

  def unsubscribe
    @list_id = "5565a3ae33"
    @email = params[:email][:address]
    unless User.find_by(email: @email, subscribe: 1)
      user = User.find_by(email: @email, subscribe: 1)
      user.subscribe  = 0
      user.save
      gb1 = Gibbon::Request.new
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

  def comfirm_subscription
  end

  def request_catalogs
  end

  def quick_order
  end

  def message
  end

end
