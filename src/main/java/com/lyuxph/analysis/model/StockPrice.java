package com.lyuxph.analysis.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class StockPrice {

    @Id
    private String Ticker;

    private String Date;

    public StockPrice() {}

    public StockPrice(String ticker, String date) {
        this.Ticker = ticker;
        this.Date = date;
    }

}
