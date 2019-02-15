require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rvm'

set :repository, 'git@bitbucket.org:vladlaptev/poligon_staging.git'

set :shared_paths, %w(
  config/database.yml
  config/secrets.yml
  config/puma.rb
  log
  public/uploads
  public/images
  public/PDF
  public/poligon_certificates
)

task :environment do
  invoke :'rvm:use[ruby-2.3.7@poligon]'
  set :rails_env, "#{stage}"
end

task :production do
  set :rvm_path,  '/home/deploy/.rvm/scripts/rvm'
  set :stage,     'production'
  set :domain,    '176.53.160.235'
  set :user,      'deploy'
  set :deploy_to, '/home/deploy/poligon'
  set :branch, 'develop'
end

task update_shared_paths: :environment do

  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/public/uploads"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/public/uploads"]
  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/public/images"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/public/images"]
  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/public/PDF"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/public/PDF"]
  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/public/poligon_certificates"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/public/poligon_certificates"]
  
end

task setup: :environment do
  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/log"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/log"]

  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/config"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/config"]

  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/public/uploads"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/public/uploads"]

  queue! %[touch "#{deploy_to}/#{shared_path}/config/database.yml"]
  queue! %[touch "#{deploy_to}/#{shared_path}/config/secrets.yml"]
  queue  %[echo "-----> Be sure to edit '#{deploy_to}/#{shared_path}/config/database.yml' and 'secrets.yml'."]

  if repository
    repo_host = repository.split(%r{@|://}).last.split(%r{:|\/}).first
    repo_port = /:([0-9]+)/.match(repository) && /:([0-9]+)/.match(repository)[1] || '22'

    queue %[
      if ! ssh-keygen -H  -F #{repo_host} &>/dev/null; then
        ssh-keyscan -t rsa -p #{repo_port} -H #{repo_host} >> ~/.ssh/known_hosts
      fi
    ]
  end
end

desc "Deploys the current version to the server."
task deploy: :environment do
  to :before_hook do
  end

  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
#   invoke :'whenever:clear'
#   invoke :'whenever:update'
    #invoke :'rails:db_migrate'
    invoke :'rails:assets_precompile'
    invoke :'deploy:cleanup'

    to :launch do
      queue "mkdir -p #{deploy_to}/#{current_path}/tmp/"
      queue "touch #{deploy_to}/#{current_path}/tmp/restart.txt"
    end
  end
end
