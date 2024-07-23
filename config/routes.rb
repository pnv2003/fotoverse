Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  root "sessions#welcome"

  scope "/:locale" do
    # Defines the root path route ("/")

    devise_for :users, controllers: {
      registrations: 'users/registrations',
      sessions: 'users/sessions'
    }

    devise_scope :user do
      get '/users/sign_out' => 'devise/sessions#destroy' # ?
    end

    resources :users, only: [:show, :update]
    get 'posts/discover'
    get 'posts/feeds'
    resources :posts, only: [:destroy]
    resources :photos, only: [:new, :create, :edit, :update]
    resources :albums, only: [:new, :create, :edit, :update]

    get 'welcome', to: 'sessions#welcome'

    get 'feeds', to: 'posts#feeds'
    get 'discover', to: 'posts#discover'
    get 'new/photo', to: 'photos#new'
    get 'new/album', to: 'albums#new'

    resources :follows, only: [:create, :destroy]
    resources :reactions, only: [:create, :destroy]

    namespace :admin do
      resources :users, only: [:index, :edit, :update, :destroy]
      resources :albums, only: [:index, :edit, :update, :destroy]
      resources :photos, only: [:index, :edit, :update, :destroy]
    end
  end
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
