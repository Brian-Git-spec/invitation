from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime


app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///guests.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Guest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    relationship = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

@app.route('/api/invite', methods=['POST'])
def save_invitation():
    data = request.json
    name = data.get('name', '').strip()
    relationship = data.get('relationship', '').strip()

    if not name :
        return jsonify({"error": "Missing data"}), 400

    if not relationship or relationship.lower() == "other":
        prefix = ""
    else:
            prefix = f"{relationship} "

    # Save to DB
    db_relation = relationship if relationship else "Other"
    new_guest = Guest(name=name, relationship=db_relation)
    db.session.add(new_guest)
    db.session.commit()

    # Generate Message
    invitation_msg = f"Dear {prefix} {name}, you are warmly invited to my graduation ceremony at The A.S.K. Dome, Jamhuri Grounds on 29th July 2026 starting at 8:30 a.m. to 1:00 p.m."
    
    return jsonify({
        "message": invitation_msg,
        "status": "success"
    })

@app.route('/api/guests', methods=['GET'])
def get_guests():
    guests = Guest.query.all()
    return jsonify([{"name": g.name, "relationship": g.relationship} for g in guests])

if __name__ == '__main__':
    app.run(debug=True, port=5000)