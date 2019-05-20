# -*- encoding : utf-8 -*-
Poligon::Application.routes.draw do

  resources :orders
  resources :line_items, except: [:index]
  resources :news_items, only: [:index, :show], path: 'news'
  resources :articles,   only: [:index, :show]
  #resources :videos,     only: [:index, :show]
  #resources :reviews,    only: [:index, :show]
  #resources :additions,  only: [:index, :show]

  resources :categories, only: [:index, :show], path: 'catalog' do
    get '/:id', to: 'products#show', as: 'product'
  end

  resources :products do
    get :autocomplete_product_title, :on => :collection
  end

  resources :carts

  get 'test_page', to: "test#show"

  get  'examples', to: "examples#index"
  get  'examples/:slug', to: "examples#show", as: "example"
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
  get  'company/agreement'
  get  'company/privacy_policy'

  get  'company/project_offer'
  get  'company/dealer_offer'

  root 'content#home'
  get  'content/show'
  get  'content/certificates'
  get  'content/download_pdf'
  get  'content/farnell'

  get 'oplata-dostavka' => 'content#delivery'

  get  'pdf_katalogi' => 'feedback#booklets', as: "feedback_booklets"
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

  get 'catalog/promyshlennaya-avtomatizaciya-tele'  => 'categories/tele',         :as => 'categories/tele'
  get 'catalog/produkciya-comatreleco' => 'categories/comat_releco', :as => 'categories/comat_releco'
  get 'catalog/ustrojstva-izmereniya-i-upravleniya-emko' => 'categories/emko',         :as => 'categories/emko'
  get 'catalog/kontaktory-puskateli-zasshita-benedict' => 'categories/benedict',     :as => 'categories/benedict'
  get 'catalog/ustrojstva-grozozasshity-i-uzip-citel'   => 'categories/citel',        :as => 'categories/citel'
  get 'catalog/vremya-teplo-svet-graesslin' => 'categories/graesslin',    :as => 'categories/graesslin'
  get 'catalog/termostaty-sonder' => 'categories/sonder',       :as => 'categories/sonder'
  get 'catalog/relequick' => 'categories/relequick',    :as => 'categories/relequick'
  get 'catalog/avtomaticheskie-vyklyuchateli-cbi' => 'categories/cbi',          :as => 'categories/cbi'
  get 'catalog/npf-poligon' => 'categories/poligonspb',   :as => 'categories/poligonspb'
  get 'catalog/prochee-oborudovanie-v-nalichii' => 'categories/huber_suhner', :as => 'categories/huber_suhner'
  get 'catalog/tehnoplast' => 'categories/tehnoplast',   :as => 'categories/tehnoplast'

  get 'stock', to: "products#stock"

  # Sample resource route within a namespace:
  namespace :admin do
    resources :panel, only: [:index]
    resources :scopes, :booklets, :static_contents, :slider_items, :settings, :articles
    resources :examples, :news_items, :search_keywords
    resources :examples do
      resources :example_images, :only => [:create, :destroy] # support #create and #destroy
    end

    post 'tasks/reindex_solr', to: "tasks#reindex_solr"
    post 'tasks/update_course', to: "tasks#update_course"

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
