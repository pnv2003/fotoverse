class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :fname
      t.string :lname
      t.string :email, index: { unique: true }
      t.string :password_digest
      t.boolean :admin
      t.boolean :active

      t.timestamps
    end
  end
end
