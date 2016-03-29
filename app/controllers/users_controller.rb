class UsersController < ApplicationController

  def index
    @user = User.new
  end

  def sign_out
  end

end
