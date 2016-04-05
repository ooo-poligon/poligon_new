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

namespace :deploy do

  task :finalize_update, :except => {:no_release => true} do
    run "chmod -R g+w #{latest_release}" if fetch(:group_writable, true)

    # mkdir -p is making sure that the directories are there for some SCM's that don't
    # save empty folders
    run <<-CMD
      rm -rf #{latest_release}/log #{latest_release}/public/system #{latest_release}/tmp/pids &&
      mkdir -p #{latest_release}/public &&
      mkdir -p #{latest_release}/tmp &&
      ln -s #{shared_path}/log #{latest_release}/log &&
      ln -s #{shared_path}/system #{latest_release}/public/system &&
      ln -s #{shared_path}/pids #{latest_release}/tmp/pids
    CMD
    run "#{ try_sudo } ln -sf #{ deploy_to }/shared/config/database.yml #{ current_path }/config/database.yml"

    if fetch(:normalize_asset_timestamps, true)
      stamp = Time.now.utc.strftime("%Y%m%d%H%M.%S")
      asset_paths = fetch(:public_children, %w(images stylesheets javascripts)).map { |p| "#{latest_release}/public/#{p}" }.join(" ")
      run "find #{asset_paths} -exec touch -t #{stamp} {} ';'; true", :env => {"TZ" => "UTC"}
    end
  end

  desc "Precompile assets"
  task :precompile_assets do
    load 'deploy/assets'
  end

  desc "Symlink shared config files"
  task :symlink_config_files do
    run "#{ try_sudo } ln -s #{ deploy_to }/shared/config/database.yml #{ current_path }/config/database.yml"
  end

  desc "Restart Passenger app"
  task :restart do
    run "#{ try_sudo } touch #{ File.join(current_path, 'tmp', 'restart.txt') }"
  end

  #desc "Cleanup unneeded files"
  #task :cleanup do
  #  cap deploy:cleanup
  #end

end

before "deploy:assets:precompile" do
  run ["ln -nfs #{shared_path}/config/settings.yml #{release_path}/config/settings.yml",
       "ln -nfs #{shared_path}/config/initializers/devise.rb #{release_path}/config/initializers/devise.rb",
       "ln -nfs #{shared_path}/config/secrets.yml #{release_path}/config/secrets.yml",
       "ln -nfs #{shared_path}/config/database.yml #{release_path}/config/database.yml",
       "ln -fs #{shared_path}/uploads #{release_path}/uploads"
  ].join(" && ")
end

after "deploy", "deploy:finalize_update"
after "deploy", "deploy:precompile_assets"
after "deploy", "deploy:restart"
#after "deploy", "deploy:cleanup"

#after "deploy:update_code", :symlink_config_files

#task :symlink_config_files do
#  symlinks = {
#      "#{shared_path}/config/database.yml" => "#{release_path}/config/database.yml"
# }
#  run symlinks.map { |from, to| "ln -nfs #{from} #{to}" }.join(" && ")
#  run "chmod -R g+rw #{release_path}/public"
#end


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
