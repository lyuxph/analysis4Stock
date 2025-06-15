import React from "react";
import VersionService from "../Service/VersionService";

class VersionComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      version: ''
    }
  }

  componentDidMount() {
    VersionService.getVersion().then((response) => {
      this.setState({version: response.data})
    })
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Version: {this.state.version}</h1>
        <h5 className="text-center">“The best way to predict the future is to invent it.” – Alan Kay</h5>
      </div>
    )
  }

}

export default VersionComponent;
