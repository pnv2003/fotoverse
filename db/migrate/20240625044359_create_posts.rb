class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :type
      t.string :title
      t.text :description
      t.string :mode

      t.timestamps
    end
  end
end
