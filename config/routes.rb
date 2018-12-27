# -*- encoding : utf-8 -*-
Poligon::Application.routes.draw do

  namespace :admin do
    get 'product_groups/index'
  end

  namespace :admin do
    get 'product_groups/show'
  end

  resources :orders
  resources :line_items, except: [:index]
  resources :news_items, only: [:index, :show]
  resources :categories, only: [:index, :show]
  resources :articles,   only: [:index, :show]
  resources :videos,     only: [:index, :show]
  resources :reviews,    only: [:index, :show]
  resources :additions,  only: [:index, :show]
  resources :products,   only: [        :show]
  resources :carts

  get  'examples/index'
  get  'examples/show'
  get  'carts/show'
  get  'carts/add'
  post 'categories/quantity_cash'
  post 'carts/update_cart_quantity'
  post 'carts/update_cart_sum'
  post 'orders/send_order_email'
  post 'feedback/send_request_or_question'
  post 'feedback/send_project_conditions'
  post 'feedback/send_request_find_analogue'
  post 'line_items/update_quantity'
  post 'carts/remove_from_cart'
  post 'carts/remove_from_cart_modal'

  get  'certificates/download'
  get  'certificates/index'

  get  'offers/index'
  get  'offers/show'

  get  'publications/index'

  get  'company/about'
  get  'company/contacts'
  get  'company/vacancies'
  get  'company/links'
  get  'company/program'
  get  'company/personal'

  root 'content#home'
  get  'content/show'
  get  'content/certificates'
  get  'content/download_pdf'
  get  'content/farnell'

  get  'feedback/booklets'
  get  'feedback/mailing_list'
  get  'feedback/confirm_subscription'
  get  'feedback/confirm_unsubscription'
  get  'feedback/farnell'
  post 'feedback/subscribe' => 'feedback#subscribe'
  post 'feedback/unsubscribe' => 'feedback#unsubscribe'
  post 'feedback/catalogs_order' => 'feedback#catalogs_order'
  post 'feedback/order_booklets' => 'feedback#order_booklets'
  post 'feedback/farnell_order' => 'feedback#farnell_order'
  post 'line_items' => "line_items#create"

  get  'search', to: 'search#search'

  get  'advanced_search', to: 'search#advanced_search'

  get  'sitemap' => 'sitemap#show', format: :html
  get  'sitemap.xml' => 'sitemap#sitemap', format: :xml

  get  'feeds', to: 'announce#index', format: 'rss'

  devise_for :users

  get 'categories/142'  => 'categories/tele',         :as => 'categories/tele'
  get 'categories/77' => 'categories/comat_releco', :as => 'categories/comat_releco'
  get 'categories/5583' => 'categories/emko',         :as => 'categories/emko'
  get 'categories/5094' => 'categories/benedict',     :as => 'categories/benedict'
  get 'categories/74'   => 'categories/citel',        :as => 'categories/citel'
  get 'categories/5414' => 'categories/graesslin',    :as => 'categories/graesslin'
  get 'categories/5535' => 'categories/sonder',       :as => 'categories/sonder'
  get 'categories/5818' => 'categories/relequick',    :as => 'categories/relequick'
  get 'categories/5512' => 'categories/cbi',          :as => 'categories/cbi'
  get 'categories/6321' => 'categories/poligonspb',   :as => 'categories/poligonspb'
  get 'categories/4847' => 'categories/huber_suhner', :as => 'categories/huber_suhner'
  get 'categories/6371' => 'categories/tehnoplast',   :as => 'categories/tehnoplast'

  get 'stock', to: "products#stock"

  # Sample resource route within a namespace:
  namespace :admin do
    resources :panel, only: [:index]
    resources :scopes, :booklets, :static_contents
    resources :examples
    resources :examples do
      resources :example_images, :only => [:create, :destroy] # support #create and #destroy
    end
    resources :tags,  only: [:index, :show]
    resources :products, only: [:index, :edit, :update]
  end

  # You can have the root of your site routed with 'root'
  # just remember to delete public/index.html.
  # root :to => 'welcome#hello'

  # See how all your routes lay out with 'rake routes'

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via get  requests.
  # match ':controller(/:action(/:id))(.:format)'
  match "/404", :to => "errors#not_found", :via => :all
  match "/422", :to => "errors#not_processable", :via => :all
  match "/500", :to => "errors#internal_server_error", :via => :all
end
