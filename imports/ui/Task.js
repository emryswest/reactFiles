import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UserFiles } from '../api/tasks.js';

class IndividualFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.removeFile = this.removeFile.bind(this);
    this.renameFile = this.renameFile.bind(this);

  }

  propTypes: {
    fileName: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    fileUrl: PropTypes.string,
    fileId: PropTypes.string.isRequired
  }

  removeFile(){
    UserFiles.remove(this.props.fileId);
    }

  renameFile(){

    let validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi;
    let prompt    = window.prompt('New file name?', this.props.fileName);

    // Replace any non valid characters, also do this on the server
    if (prompt) {
      prompt = prompt.replace(validName, '-');
      prompt.trim();
    }

    if (!_.isEmpty(prompt)) {
      Meteor.call('RenameFile', this.props.fileId, prompt, function (err, res) {
        if (err)
          console.log(err);
      })
    }
  }

  render() {
    return <div className="m-t-sm">
      <div className="row">
        <div className="col-md-12">

          <a href={this.props.fileUrl} className="btn btn-outline btn-primary btn-sm"
             target="_blank"><strong>{this.props.fileName}</strong></a>

          <div className="m-b-sm">
          </div>
        </div>
      </div>

      <div className="row">



        <div className="col-md-2">
          <button onClick={this.removeFile} className="btn btn-outline btn-danger btn-sm">
            Delete
          </button>
        </div>

      </div>
    </div>
  }
}
export default IndividualFile;
