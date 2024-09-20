from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

serviceEmployees=[]


@app.route('/employees', methods=['GET'])
def get_employees():
	return serviceEmployees

@app.route('/employees/<int:employee_id>', methods=['GET'])
def get_employee(employee_id):
	for employee in serviceEmployees:
		if employee['id']==employee_id:
			return employee
		
	return {"error": "employee not found"}

	
# Create a employee
@app.route('/employees', methods=['POST'])
def create_book():
    new_employee={'id':len(serviceEmployees)+1, 'name':request.json['name'], 
									'occupation':request.json['occupation'], 'experience':request.json['experience'], 
									'contactno':request.json['contactno'], 'location':request.json['location'],
									'mail':request.json['mail'], 'rating':request.json['rating']}
    serviceEmployees.append(new_employee)
    return new_employee

if __name__ == '__main__':
	app.run(debug=True,port=5000)