import "./Dashboard.css";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Space,
  Button,
} from "antd";
import { useState, useEffect } from "react";
import ServiceObj from "../Services/Services";
import { message } from "antd";
import { getTokenDetails } from "../../Utils/CheckAuth";
message.config({
  duration: 2,
  maxCount: 3,
});
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePage from "../Profile/Profile";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [userRole, setRole] = useState("");

  const GetAllRecords = async () => {
    var GetUserRecords = await ServiceObj.getAll("users/all");
    if (GetUserRecords.status == "ok") {
      var i = 1;
      var user_id = localStorage.getItem("id");
      var data = GetUserRecords.data;
      var updateUser = data.filter((el) => {
        if (user_id != el.user_id) {
          el["key"] = i;
          i = i + 1;
          return el;
        }
      });
      setData(updateUser);
    }
  };
  const logout = (e) => {
    ServiceObj.logoutUser();
    message.success("Logout sucessfully!");
  };

  useEffect(() => {
    var data = getTokenDetails();
    setRole(data.user.role.toLowerCase());
    GetAllRecords();
  }, []);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      emp_firstname: "",
      emp_lastname: "",
      emp_email: "",
      emp_address: "",
      emp_role: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const deleteRecord = async (key) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      const item = newData[index];
      var deleteRes = await ServiceObj.delete("users/deleteUser", item.user_id);
      if (deleteRes.status == "ok") {
        message.success("User deleted successfully!");
      }

      await GetAllRecords();
    }
  };
  const cancel = async () => {
    const row = await form.validateFields();
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        row["user_id"] = item.user_id;
        var UpdateRes = await ServiceObj.post("users/update", row);
        if (UpdateRes.status == "ok") {
          message.success("User updated successfully!");
        }
        await GetAllRecords();
      }

      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "S.NO",

      dataIndex: "key",
      width: "4%",
    },
    {
      title: "Employee ID",
      dataIndex: "user_id",
      // width: "10%",
    },
    {
      title: "First Name",
      dataIndex: "emp_firstname",
      // width: "15%",
      editable: true,
    },
    {
      title: "Last Name ",
      dataIndex: "emp_lastname",
      // width: "15%",
      editable: true,
    },
    {
      title: "Email ID",
      dataIndex: "emp_email",
      // width: "20%",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "emp_address",
      // width: "20%",
      editable: true,
    },
    {
      title: "User Role",
      dataIndex: "emp_role",
      // width: "20%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Space size="middle">
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
              <Typography.Link onClick={() => deleteRecord(record.key)}>
                Delete
              </Typography.Link>
            </Space>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = () => {
    let id = ServiceObj.betweenRandomNumber();
    const newData = {
      user_id: id,
      emp_firstname: "",
      emp_lastname: "",
      emp_email: "",
      emp_address: "",
      emp_role: "",
      key: data.length + 1,
    };
    setData([...data, newData]);
    setEditingKey(newData.key);
    message.success("User added successfully!");
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="form">
          <div className="dashboard">
            <span className="icon">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                onClick={(e) => logout()}
              />
            </span>
            <header className="header">
              <h2>Organization Data's</h2>
            </header>
            {userRole === "hr" ? (
              <>
                <Button
                  // disabled={true}
                  disabled={editingKey != "" ? true : false}
                  onClick={handleAdd}
                  type="primary"
                  style={{
                    marginBottom: 16,
                  }}
                >
                  Add Data
                </Button>
                <Form form={form} component={false}>
                  <Table
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                      onChange: cancel,
                    }}
                    size="small"
                  />
                </Form>
              </>
            ) : (
              <ProfilePage />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
