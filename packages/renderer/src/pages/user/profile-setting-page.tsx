import { Flex, Button, Form, Input, Divider } from "antd";
import ProfilePictureUpload from './../../components/profile-picture-upload';
const ProfileSettingPage = () => {
  return (
    <>
      <p>
        Manage your profile settings here.<br></br>Change your password, update
        email, and more.
      </p>
      <Divider></Divider>
      <Flex
        style={{
          flexDirection: "row",

          width: "100%",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <h3>Change Profile Picture</h3>
        <Flex style={{ width: "40%", justifyContent: "flex-start", }}>
          <ProfilePictureUpload />
        </Flex>
      </Flex>
      <Divider></Divider>
      <Flex
        style={{
          flexDirection: "row",
          gap: 16,
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <h3>Update User Information</h3>
        <Form layout="vertical" style={{ width: "40%" }}>
          <Form.Item label="New Username">
            <Input placeholder="New Username"></Input>
          </Form.Item>
          <Form.Item label="New Email">
            <Input placeholder="New Email"></Input>
          </Form.Item>
          <Form.Item label="New Phone Number">
            <Input placeholder="New Phone Number"></Input>
          </Form.Item>
          {/* <Button variant="solid" color="geekblue">
            Save Changes
          </Button> */}
        </Form>
      </Flex>
      <Divider></Divider>
      <Flex
        style={{
          flexDirection: "row",
          gap: 16,
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <h3>Update Password</h3>
        <Form layout="vertical" style={{ width: "40%" }}>
          <Form.Item label="Old Password">
            <Input placeholder="Old Password"></Input>
          </Form.Item>
          <Form.Item label="New Password">
            <Input placeholder="New Password"></Input>
          </Form.Item>
          <Form.Item label="Confirm Password">
            <Input placeholder="Confirm New Password"></Input>
          </Form.Item>

          {/* <Button variant="solid" color="geekblue">
            Save Changes
          </Button> */}
        </Form>
      </Flex>

      <Flex style={{ width: "100%", justifyContent: "flex-end",}}>
        <Button variant="solid" type="primary" size="large" >
          Apply Changes
        </Button>
      </Flex>

    </>
  );
};

export default ProfileSettingPage;
