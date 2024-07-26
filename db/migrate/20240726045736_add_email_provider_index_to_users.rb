class AddEmailProviderIndexToUsers < ActiveRecord::Migration[7.1]
  def change
    add_index :users, [:email, :provider], unique: true
  end
end
