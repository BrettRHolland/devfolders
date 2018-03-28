Rails.application.routes.draw do
  resources :boards
  get 'home/index'

  devise_for :users
  root to: 'home#index'
end
