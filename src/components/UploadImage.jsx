import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Divider, CardHeader } from '@material-ui/core';
import {api} from '../utils/Api';
import uuid from "react-uuid"
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';

export default class UploadImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            render: {},
            dis_url :null,
            name :null,
            find_poke : false,
        }        
        
    }

    async get_classification(){
        let poke_image = this.props.image_data
		await new Promise(r => setTimeout(r, 15));
		let best_display = false
		let res = await fetch("https://main-pokemon-classifier-imjeffhi4.endpoint.ainize.ai/classify/", {
			method: "POST",
			body: JSON.stringify({poke_image}),
		})
		let json = await res.json()
		let name = json['Name']
		let display_url = json["Display"]
		best_display = display_url ? true : false
		let default_url = json['Default']
		let ready = true
        this.setState({name : name})
        this.setState({dis_url : default_url})
	}

    componentWillReceiveProps(nextProps) {
       this.setState({render: {}})
    }

    saveImage() {
        api("imageprocessing/", 
        {
            title: uuid(),
            image: this.props.image_data
        }
        // base64_encode(this.props.image_data)
        );
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

        if (!this.props.image_data) {
            return (
                <div></div>
            )
        }

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Stack
                    sx={{ mt: 1, mb: 1 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    >
                        <Button variant="outlined" color="primary" onClick={() =>  this.saveImage()} >
                            이미지 저장
                        </Button>
                        <Button variant="contained" color="primary" onClick={() =>  this.saveImage()} >
                            닮은 포켓몬 찾기
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12}>       
                    {this.state.dis_url && (
                        <Card align = "center">
                        <CardHeader title={"당신을 닮은 포켓몬은? " + this.state.name} align = "center" style ={tempStyle}> </CardHeader>
                        <img
                            src={this.state.dis_url}
                            alt=""
                            width="224"
                            height="224"
                            align = "center"
                        />
                        </Card>
                    )}
                </Grid>
            </Grid>
        );
    }
}
export const base64_encode = (imagedata) => {
    let buf = new Buffer(imagedata);
    let base64 = buf.toString('base64');
    return base64;
};
