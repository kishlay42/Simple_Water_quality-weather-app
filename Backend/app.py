from flask import Flask, request, jsonify
from langchain.document_loaders import TextLoader
import textwrap
import os
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import HuggingFaceHub
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Set environment variable for Hugging Face model API token
os.environ["HUGGINGFACEHUB_API_TOKEN"] = "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"

# Enable CORS for your app
CORS(app, origins="http://localhost:3000")

# Define a function to generate answers to questions
def generate_answer(question):
    # Load a text document
    loader = TextLoader("Andhra_P.txt")
    document = loader.load()

    # Wrap text while preserving newlines
    def wrap_text_preserve_newlines(text, width=110):
        lines = text.split('\n')
        wrapped_lines = [textwrap.fill(line, width=width) for line in lines]
        wrapped_text = '\n'.join(wrapped_lines)
        return wrapped_text

    # Split the text document into smaller documents
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    docs = text_splitter.split_documents(document)

    # Embed text documents
    embeddings = HuggingFaceEmbeddings()
    db = FAISS.from_documents(docs, embeddings)

    # Load a question-answering chain using Hugging Face models
    llm = HuggingFaceHub(repo_id="google/flan-t5-xxl", model_kwargs={"temperature": 0.8, "max_length": 512})
    chain = load_qa_chain(llm, chain_type="stuff")

    # Perform a similarity search to find relevant documents
    docsResult = db.similarity_search(question)

    # Use the question-answering chain to answer the question
    answer = chain.run(input_documents=docsResult, question=question)

    return answer

@app.route('/predict', methods=['POST'])
def ask_question():
    if 'question' in request.json:
        question = request.json['question']
        answer = generate_answer(question)
        print(answer)
        return jsonify({"answer": answer})
    else:
        return jsonify({"error": "Question not provided"})

if __name__ == '__main__':
    app.run(debug=True)
