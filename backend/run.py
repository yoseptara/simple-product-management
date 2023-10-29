from app import app
from app.db import db

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print('Registered routes:')
        for rule in app.url_map.iter_rules():
            methods = ",".join(sorted(rule.methods))
            print(f"{rule} (methods: {methods})")

    app.run(host="0.0.0.0", port=5000, debug=True)