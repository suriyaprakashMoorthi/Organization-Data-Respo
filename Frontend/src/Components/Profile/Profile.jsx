import "./Profile.css";
import { useEffect, useState } from "react";
import { Button, Form, Input, Card } from "antd";
import ServiceObj from "../Services/Services";
const ProfilePage = () => {
  const [userProfile, setProfile] = useState({});
  const getUserIdData = async () => {
    let user_id = localStorage.getItem("id");
    var res = await ServiceObj.get("users/getuser", user_id);
    if (res.status == "ok") {
      setProfile(res.data);
    }
  };
  useEffect(() => {
    getUserIdData();
  }, []);

  return (
    <>
      <div className="card">
        <Card
          title="User Profile"
          bordered={false}
          style={{
            width: 650,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {userProfile ? (
            <>
              <div className="profile">
                <div>
                  <label>User ID : </label>
                  <span>{userProfile.user_id}</span>
                </div>
                <div>
                  <label>First Name : </label>
                  <span>{userProfile.emp_firstname}</span>
                </div>
                <div>
                  <label>Last Name : </label>
                  <span>{userProfile.emp_lastname}</span>
                </div>
                <div>
                  <label>Email : </label>
                  <span>{userProfile.emp_email}</span>
                </div>
                <div>
                  <label>Adddress : </label>
                  <span>{userProfile.emp_address}</span>
                </div>
                <div>
                  <label>Department : </label>
                  <span>{userProfile.emp_department}</span>
                </div>
              </div>
            </>
          ) : (
            "Empty"
          )}
        </Card>
      </div>
    </>
  );
};
export default ProfilePage;
