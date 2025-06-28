#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Jun 21 09:58:46 2025

@author: l
"""

from langchain_openai import ChatOpenAI
from langchain.utilities import SQLDatabase
from langchain.chains.sql_database.query import create_sql_query_chain

import os

from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/db_agent')
def call_db():
    os.environ['OPENAI_API_KEY'] = os.getenv("OPENAI_API_KEY")
    DB_USER = "root"
    DB_PASSWORD = "root_password"
    DB_HOST = "db:3306"
    DB_NAME = "analysis"

    db = SQLDatabase.from_uri(f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}")

    llm = ChatOpenAI(temperature=0)

    chain = create_sql_query_chain(llm, db)

    question = request.args.get('question')
    res = chain.invoke({"question": question})

    return res


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)