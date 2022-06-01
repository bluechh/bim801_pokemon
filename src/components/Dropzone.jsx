import React, {Component, createRef} from 'react';
import Dropzone from 'react-dropzone';
import styles from "./Dropzone.module.css"

export default class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = (files) => {
      this.setState({files})
      this.props.onImageChange(files)
    };

    this.state = {
      files: []
    };
  }


  render() {
    const files = this.state.files.map(file => URL.createObjectURL(file));
    const dropzoneRef = createRef()

    const tempStyle = {
      boder: "'1px dashed black'",
      background: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    };

    const tempStyle2 = {
      boder: "'1px dashed black'",
      color: "blue",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontfamily: "Malgun Gothic",
      fontweight: "bold",
    };

    return (
      <Dropzone ref={dropzoneRef} onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <section  style ={tempStyle} className="container">
            <div  {...getRootProps({className: 'dropzone'})}>
              <input  {...getInputProps()} />
              <p style ={tempStyle2}>원하는 이미지를 드래그&드롭하거나</p>
              <p style ={tempStyle2}>클릭해서 이미지를 선택하세요!</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

<Basic />