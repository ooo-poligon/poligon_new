class FeedbackController < ApplicationController
  require 'digest/md5'

  def mailing_list
  end

  def subscribe
    @list_id = "5565a3ae33"
    @email = params[:email][:address]
    unless User.find_by(email: @email, role: "subscribed")
      user = User.new
      user.email = @email
      user.role  = "subscribed"
      user.save
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
    unless User.find_by(email: @email, role: "subscribed")
      user = User.find_by(email: @email, role: "subscribed")
      user.role = "unsubscribed"
      user.save
      #gb1 = Gibbon::Request.new
      #md5_email = Digest::MD5.hexdigest(@email.downcase)
      #gb1.lists(@list_id).members(md5_email).update(
      #  body:
      #  {
      #    status: "unsubscribed"
      #  })
    else
      render "subscriber_not_exist"
    end
  end

  def request_catalogs
  end

  def quick_order
  end

end
