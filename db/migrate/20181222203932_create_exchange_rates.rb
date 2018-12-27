class CreateExchangeRates < ActiveRecord::Migration
  def change
    create_table :exchange_rates do |t|
      t.decimal :eur_rate, :precision => 8, :scale => 2
      t.decimal :usd_rate, :precision => 8, :scale => 2
      t.timestamps null: false
    end
  end
end
