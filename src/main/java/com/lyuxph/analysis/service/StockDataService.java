package com.lyuxph.analysis.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

@Service
public class StockDataService {

    public final JSONObject findStock(final String ticker) {
        try {
            URL url = new URL("https://financialmodelingprep.com/api/v3/historical-price-full/"
                    + ticker + "?timeseries=5&apikey=6506d57d854ccc780d93fa627e91faf4");

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
            StringBuilder stringBuilder = new StringBuilder();
            for (String line; (line = bufferedReader.readLine()) != null;) {
                stringBuilder.append(line);
            }

            JSONObject jsonObject = new JSONObject(stringBuilder.toString());

            return jsonObject;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
