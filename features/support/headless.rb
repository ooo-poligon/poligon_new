if Capybara.current_driver == :selenium || Capybara.default_driver == :selenium
  require 'headless'

  headless = Headless.new
  headless.start

  at_exit do
    headless.destroy
  end
end
