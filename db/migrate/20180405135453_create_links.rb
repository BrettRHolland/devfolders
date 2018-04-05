class CreateLinks < ActiveRecord::Migration[5.1]
  def change
    create_table :links do |t|
      t.integer :folder_id, null: false
      t.string :title, null: false
      t.string :content, null: false
      t.text :notes

      t.timestamps
    end
  end
end
