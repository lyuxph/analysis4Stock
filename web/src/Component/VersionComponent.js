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
        <h1 className="text-center">Ver: {this.state.version}</h1>
      </div>
    )
  }

}

export default VersionComponent;
