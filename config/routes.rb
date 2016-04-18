# -*- encoding : utf-8 -*-
Poligon::Application.routes.draw do
  get 'users/sign_in'
  devise_for :users
  resources :news_items
  resources :categories
  resources :articles
  resources :videos
  resources :reviews
  resources :additions
  resources :products
  resources :content
  #resources :users
  get "devise/new", to: "devise/sessions#new"
  get "publications/index"
  get "articles/index"
  get "videos/index"
  get "reviews/index"
  get "additions/index"
  get "products/index"
  get "categories/index"
  get "categories/show"
  get "company/about"
  get "company/contacts"
  get "company/vacancies"
  get "company/links"
  get "content/sertificates"
  get "content/download_pdf"
  get "content/farnell"
  get "feedback/booklets"
  get 'feedback/mailing_list'
  get 'feedback/confirm_subscription'
  get 'feedback/confirm_unsubscription'
  get 'search', to: 'search#search'
  get "sitemap" => "sitemap#show", format: :html, as: :sitemap
  get "sitemap/sitemap", format: :xml
  get 'feeds', to: 'announce#index', format: 'rss'
  post 'feedback/subscribe' => 'feedback#subscribe'
  post 'feedback/unsubscribe' => 'feedback#unsubscribe'
  get 'feedback/catalogs_order' => 'feedback#catalogs_order'

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
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
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
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => "content#home"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
