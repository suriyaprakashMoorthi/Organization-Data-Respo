# sample login data

### Admin Login

UserID : 12345
Pwd : 12345
role : HR

This Id can able to Edit/delete/update user's data

### User Login

UserID : 1234
Pwd : 1234
role : user

This Id Only can view an self data.

# Tools and Technologies:
### Frontend : React, Vite and Ant Design
### Backend : Node js, axios, passport.js, JWT, cors..,
### DB : MongoDB

# DB Relation User to Organization collection

### Sample User Data

Personal key link with Organization data id.

```
{
  "_id":{"$oid":"660ffb27e10d197acb04282e"},
  "emp_id":"12345",
  "emp_password":"12345",
  "personal":{"$oid":"660ffb27e10d197acb04282c"}
}
```

### Sample Organization collection

```
{
  "_id":{"$oid":"660ffb27e10d197acb04282c"},
  "user_id":"12345",
  "emp_firstname":"Bernadette",
  "emp_lastname":"McKenzie",
  "emp_dob":"Thu Dec 29 1988 11:18:58 GMT+0530 (India Standard Time)",
  "emp_email":"Max.Kohler64@gmail.com",
  "emp_address":"12906 Kunze Rest",
  "emp_role":"HR",
  "emp_department":"Software Department",
  "is_delete":"Active"
}
```

# Run Cmd:

### Frontend:

`npm start`

### Backend:

`npm start`

### project up below link

`http://localhost:3010/organizations`
