class CreateFolders < ActiveRecord::Migration[5.1]
  def change
    create_table :folders do |t|
      t.integer :user_id, null: false
      t.string :topic, null: false
      t.string :color, default: 'default'

      t.timestamps
    end
  end
end
