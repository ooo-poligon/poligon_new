# -*- encoding : utf-8 -*-
Poligon::Application.routes.draw do
  # get  'welcome/hello'


  resources  :news_items
  resources  :categories
  resources  :articles
  resources  :videos
  resources  :reviews
  resources  :additions
  resources  :products
  resources  :content

  get  'certificates/download'
  get  'certificates/index'

  get  'offers/index'
  get  'offers/show'

  get  'publications/index'

  get  'company/about'
  get  'company/contacts'
  get  'company/vacancies'
  get  'company/links'

  root :to => 'content#home'
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
  post 'feedback/farnell_order' => 'feedback#farnell_order'

  get  'search', to: 'search#search'

  get  'advanced_search', to: 'search#advanced_search'

  get  'sitemap' => 'sitemap#show', format: :html
  get  'sitemap.xml' => 'sitemap#sitemap', format: :xml

  get  'feeds', to: 'announce#index', format: 'rss'

  devise_for :users



  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get  'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get  'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get  'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with 'root'
  # just remember to delete public/index.html.
  # root :to => 'welcome#hello'

  # See how all your routes lay out with 'rake routes'

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via get  requests.
  # match ':controller(/:action(/:id))(.:format)'
end
