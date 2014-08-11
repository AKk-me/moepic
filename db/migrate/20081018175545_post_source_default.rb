class PostSourceDefault < ActiveRecord::Migration
  def self.up
    execute "ALTER TABLE posts ALTER COLUMN source SET DEFAULT ''"
  end

  def self.down
    execute "ALTER TABLE posts ALTER COLUMN source DROP DEFAULT"
  end
end
