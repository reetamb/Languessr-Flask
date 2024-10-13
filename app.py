from flask import Flask, render_template, jsonify
import data.languessr as languessr

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def home():
    languessr.initialize()
    ph = languessr.phonemes()
    ln = languessr.language()
    lc = languessr.location()
    return render_template("home.html", phonemes=ph, language=ln, location=lc)

@app.route("/lang")
def data():
    return jsonify({"phonemes": languessr.phonemes(), "language": languessr.language(), "location": languessr.location()})

if __name__ == "__main__":
    import os
    HOST = os.environ.get("SERVER_HOST", "localhost")
    try:
        PORT = int(os.environ.get("SERVER_PORT", "5555"))
    except ValueError:
        PORT = 5555
    app.run(HOST, PORT)