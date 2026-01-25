import React from "react";
import UserContext from "../utils/UserContext";
import { UserClassShimmer } from "./Shimmer"; // Import shimmer component

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }

  async componentDidMount() {
    try {
      const data = await fetch(`https://api.github.com/users/Ashish93-mrx`);
      const res = await data.json();

      this.setState({
        userInfo: res,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  render() {
    const { userInfo } = this.state;

    if (!userInfo) {
      return <UserClassShimmer />;
    }

    const { name, location, avatar_url, html_url } = userInfo;

    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 py-18">
        <img
          src={avatar_url}
          alt="User Avatar"
          className="w-32 h-32 rounded-full shadow-md border-4 border-orange-400"
        />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Name: {name}</h2>
          <h3 className="text-lg text-gray-600">Location: {location}</h3>
          <a className="text-blue-700 underline" href={html_url} target="_blank" rel="noreferrer">
            View profile
          </a>
          <UserContext.Consumer>
            {({ loggedInUser }) => (
              <h2 className="mt-2 text-md text-orange-500 font-medium">
                Logged in as: {loggedInUser}
              </h2>
            )}
          </UserContext.Consumer>
        </div>
      </div>
    );
  }
}

export default UserClass;
