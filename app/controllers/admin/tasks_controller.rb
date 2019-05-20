class Admin::TasksController < Admin::BaseController

  def reindex_solr
    @result = %x[bundle exec rake sunspot:solr:reindex RAILS_ENV=#{Rails.env}]
    respond_to do |format|
      format.js # actually means: if the client ask for js -> return file.js
    end
  end

  def update_course
    @result = %x[bundle exec rake update_exchange_rate RAILS_ENV=#{Rails.env}]
    respond_to do |format|
      format.js # actually means: if the client ask for js -> return file.js
    end
  end

end
