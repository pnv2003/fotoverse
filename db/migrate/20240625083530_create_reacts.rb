class CreateReacts < ActiveRecord::Migration[7.1]
  def change
    create_table :reacts do |t|
      t.references :post, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
