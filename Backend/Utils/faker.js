const { faker } = require("@faker-js/faker");
var user_ids = []

function betweenRandomNumber(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

function createRandomUser() {
  let id = betweenRandomNumber(1000, 9999)
  user_ids.push(id)
  return {
    emp_id: id,
    emp_password: id,
  }

}


function createRandomOrgData(emp_id) {
  let id = betweenRandomNumber(1000, 9999)
  return {
    // user_id: id,
    user_id: emp_id,
    emp_firstname: faker.person.firstName(),
    emp_lastname: faker.person.lastName(),
    emp_dob: faker.date.birthdate(),
    emp_email: faker.internet.email(),
    emp_address: faker.location.streetAddress(),
    emp_role: faker.helpers.arrayElement(['user', 'HR', 'Team Leader']),
    emp_department: faker.helpers.arrayElement(['Software Department', "Software Testing", 'UI Team', 'IT Team']),
    is_delete: "Active"
  }
}

exports.GetUserData = () => {
  var UserData = faker.helpers.multiple(createRandomUser, {
    count: 10,
  });
  return UserData;
}


exports.GetOrganizeData = (emp_id) => {
  // var Organize = faker.helpers.multiple(createRandomOrgData, {
  //   count: 10,
  // });
  var Organize = createRandomOrgData(emp_id);
  Organize.user_id = emp_id

  return Organize;
}