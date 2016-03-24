require 'rvm/capistrano'
require 'bundler/capistrano'

ssh_options[:forward_agent] = true
set :rvm_path, "/usr/local/rvm"
# set :rvm_bin_path, "/usr/local/rvm/bin"
set :rvm_ruby_string, '2.2.1@default'

set :application, "Poligon New Site"
set :repository,  "git@github.com:poligon-info/poligon_new.git"
set :default_stage, "production"
# set :stages, %w(production)
set :use_sudo, false
set :user, 'ror' # нужно предварительно создать юзера на сервере, юзать root'a не стоит
set :scm, :git
set :normalize_asset_timestamps, false

set :rails_env, 'production'
set :branch, 'master'
set :deploy_to, "/var/www/poligon_ror"
set :deploy_via, :copy
server '89.253.227.59', :web, :app, :db, :primary => true



after "deploy:update_code", :symlink_config_files

task :symlink_config_files do
  symlinks = {
      "#{shared_path}/config/database.yml" => "#{release_path}/config/database.yml"
  }
  run symlinks.map { |from, to| "ln -nfs #{from} #{to}" }.join(" && ")
  run "chmod -R g+rw #{release_path}/public"
end
# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end