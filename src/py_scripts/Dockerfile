FROM python:3.12.11
WORKDIR /usr/src/py_scripts
COPY . .
RUN pip install Flask
RUN pip install langchain_openai
RUN pip install langchain
RUN pip install langchain_community
RUN pip install pymysql
CMD ["python", "db_agent.py"]
