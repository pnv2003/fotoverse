class AddUrlToMedia < ActiveRecord::Migration[7.1]
  def change
    add_column :media, :url, :string
  end
end
