class CreateFolders < ActiveRecord::Migration[5.1]
  def change
    create_table :folders do |t|
      t.integer :user_id, null: false
      t.string :topic, null: false
      t.string :category

      t.timestamps
    end
  end
end
