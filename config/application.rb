require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Poligon
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
    config.i18n.default_locale = :ru
    config.i18n.locale = :ru

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
    config.autoload_paths += %W(#{config.root}/lib)
    config.encoding = "utf-8"

    config.assets.enabled = true
    config.assets.precompile += %w(*.js admin.css admin.js)
    config.exceptions_app = self.routes

    file = File.join(Rails.root, 'config','redirect_list.csv')
  
    config.middleware.insert_before(Rack::Runtime, Rack::Rewrite) do
      File.open(file).each do |line|
        url = line.remove("\n").split(",")
        r301 "#{url[0]}", "#{url[1]}"
      end
    end

  end
end

SuckerPunch.logger = Logger.new("#{Rails.root}/log/sucker_punch.log")
