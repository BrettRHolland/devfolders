class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.integer :folder_id, null: false
      t.string :title, null: false
      t.text :content, null: false

      t.timestamps
    end
  end
end
