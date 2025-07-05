#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Jun 21 09:58:46 2025

@author: l
"""

from langchain_openai import ChatOpenAI
from langchain.utilities import SQLDatabase
from langchain.chains.sql_database.query import create_sql_query_chain
from langchain_community.tools.sql_database.tool import QuerySQLDatabaseTool
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.chains import LLMChain


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

    execute_query = QuerySQLDatabaseTool(db=db)

    write_query = create_sql_query_chain(llm, db)

    answer_prompt = PromptTemplate.from_template("""
    You are an analyst writing for business readers.

    **Question**
    {question}

    **Raw Data**
    {data}

    **Write an answer** (1–2 short sentences, plain English):
    """)

    english_chain = LLMChain(
    llm=llm,
    prompt=answer_prompt,
    output_parser=StrOutputParser() # returns a clean string
    )

    sql_chain = write_query | execute_query

    question = request.args.get('question')
    res = sql_chain.invoke({"question": question})
    ans = english_chain.invoke({"question": question, "data": res})
    return ans


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)