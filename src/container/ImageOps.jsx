import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import { decode as base64_decode, encode as base64_encode } from "base-64";

import WebCamCapture from "../components/WebCamCapture";
import UploadImage from "../components/UploadImage";
import Basic from "../components/Dropzone";

import { api } from "../utils/Api";
import uuid from "react-uuid";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { inputAdornmentClasses } from "@mui/material";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
export default class ImageAppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleUploadImageChange = this.handleUploadImageChange.bind(this);

    this.state = {
      image_data: null,
      loading: false,
      image_file: null,
      dis_url: null,
      name: null,
    };
  }

  async get_classification() {
    let poke_image = this.state.image_file;
    await new Promise((r) => setTimeout(r, 20));
    let best_display = false;
    let res = await fetch(
      "https://main-pokemon-classifier-imjeffhi4.endpoint.ainize.ai/classify/",
      {
        method: "POST",
        body: JSON.stringify({ poke_image }),
      }
    );
    // let res = await fetch("http://eec2-34-143-237-29.ngrok.io/", {
    //   method: "POST",
    //   body: JSON.stringify({ poke_image }),
    // });
    let json = await res.json();
    let poke_name = json["Name"];
    let img_res = await fetch("https://bim801-server.herokuapp.com/", {
      method: "POST",
      body: JSON.stringify({ poke_name }),
    });
    let img_json = await img_res.json();
    let name = img_json["Name"];
    let display_url = img_json["Display"];
    best_display = display_url ? true : false;
    let default_url = img_json["Default"];

    let ready = true;
    this.setState({ name: name });
    this.setState({ dis_url: default_url });
  }

  handleUploadImageChange(files) {
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      const test = e.target.result;
      this.setState({ image_file: test });
    };
  }

  saveCapturedImage(data) {
    this.setState({ image_data: data });
  }

  saveUploadImage(data) {
    this.setState({ image_file: data });
  }

  turnCamera() {
    if (this.state.loading) {
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
    }
  }

  saveImage() {
    api("imageprocessing/", {
      title: uuid(),
      image: JSON.stringify(this.state.image_file),
    });
    this.get_classification();
  }

  render() {
    const tempStyle = {
      boder: "'1px dashed black'",
      background: "red",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    };
    const theme = createTheme();

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <img src="/pocketmon_logo.svg" alt="" />
            </Grid>
            <Grid item xs={5}>
              <Card>
                <Basic
                  onImageChange={(data) => this.handleUploadImageChange(data)}
                />
              </Card>
              {this.state.image_file && !this.state.loading && (
                <Card align="center">
                  <CardHeader
                    title={"업로드한 이미지"}
                    align="center"
                    style={tempStyle}
                  >
                    {" "}
                  </CardHeader>
                  <img
                    src={this.state.image_file}
                    alt=""
                    width="100%"
                    height="100%"
                    align="center"
                  />
                  <Stack
                    sx={{ mt: 1, mb: 1 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      align="left"
                      color="primary"
                      onClick={() => this.saveImage()}
                    >
                      닮은 포켓몬 찾기!
                    </Button>
                  </Stack>
                  {this.state.name && (
                    <Card align="center">
                      <CardHeader
                        title={"당신을 닮은 포켓몬은? " + this.state.name}
                        align="center"
                        style={tempStyle}
                      >
                        {" "}
                      </CardHeader>
                      <img
                        src={this.state.dis_url}
                        alt=""
                        width="224"
                        height="224"
                        align="center"
                      />
                    </Card>
                  )}
                </Card>
              )}
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textPrimary" component="h6">
                    CAMERA PREVIEW
                  </Typography>
                  <Stack
                    sx={{ mt: 1, mb: 1 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      align="center"
                      color="primary"
                      onClick={() => this.turnCamera()}
                    >
                      Camera On/Off
                    </Button>
                  </Stack>
                </CardContent>
                {this.state.loading && (
                  <WebCamCapture
                    saveCapturedImage={(data) => this.saveCapturedImage(data)}
                  />
                )}
                {this.state.loading && this.state.image_data && (
                  <CardContent>
                    <CardHeader
                      title={`Captured Image`}
                      align="center"
                    ></CardHeader>
                    <img
                      src={this.state.image_data}
                      alt=""
                      align="center"
                      width="100%"
                      height="100%"
                    />
                    <Box>
                      <UploadImage image_data={this.state.image_data} />
                    </Box>
                  </CardContent>
                )}
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}
