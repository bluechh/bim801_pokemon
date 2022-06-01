import React from 'react';
import Webcam from 'react-webcam';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Stack from '@mui/material/Stack';

export default class WebCamCaptureContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videoConstants: {
                width: 640,
                height: 480,
                facingMode: 'user'
            }
        }

    }

    captureImage() {

        this.props.saveCapturedImage(this.refs.webcam.getScreenshot());
    }

    render() {

        return (
          <div>
            <Grid container>
              <Grid item xs={12}>
                <Webcam
                  ref="webcam"
                  audio={false}
                  // height={350}
                  screenshotFormat="image/jpeg"
                  // width={350}
                  videoConstraints={this.state.videoConstants}
                />
              </Grid>
                <Grid item xs={12}>
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
                    onClick={() => this.captureImage()}
                    >
                        화면 캡쳐하기
                    </Button>
                    </Stack>
                </Grid>
            </Grid>
          </div>
        );
    }
}