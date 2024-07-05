Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "sessions#welcome"

  resources :sessions, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show, :edit, :update]
  get 'posts/discover'
  get 'posts/feeds'
  resources :posts, only: [:destroy]
  resources :photos, only: [:new, :create, :edit, :update]
  resources :albums, only: [:new, :create, :edit, :update]

  get 'welcome', to: 'sessions#welcome'
  get 'login', to: 'sessions#new'
  get 'signup', to: 'users#new'

  get 'feeds', to: 'posts#feeds'
  get 'discover', to: 'posts#discover'
  get 'new/photo', to: 'photos#new'
  get 'new/album', to: 'albums#new'
  get 'profile', to: 'users#show'
  delete 'logout', to: 'sessions#destroy'

  namespace :admin do
    resources :users, only: [:index, :edit, :update, :destroy]
    resources :albums, only: [:index, :edit, :update, :destroy]
    resources :photos, only: [:index, :edit, :update, :destroy]
  end

end
