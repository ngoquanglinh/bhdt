import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Component } from 'react';


// import Loading from './../../../components/loading';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = (theme) => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    DashboardWrapper: {
        margin: '40px 16px',
    },
});

class CardOverview extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { classes, tags } = this.props;
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {this.props.title}
                    </Typography>
                    <h2 className="text-primary mt-2">
                        {this.props.total}
                    </h2>
                </CardContent>
                <CardActions>
                    {/* <span
                        style={{
                            width: 45,
                            background: this.props.ratio > 0 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                            color: this.props.ratio > 0 ? 'rgb(76, 175, 80)' : 'rgb(244, 67, 54)',
                            fontSize: 12,
                            textAlign: 'center'
                        }}>
                        {this.props?.ratio ?  this.props.ratio > 1000 ? '> ' : this.props.ratio < 1000  && this.props.ratio > 0 ? '+ ' : '- ' : '+ '}
                        {this.props.ratio > 1000 ? " 900 %" : this.props.ratio + " %" ?? 0 + '%'}
                    </span> */}
                    {/* <span style={{fontSize:13}}>So với tháng trước</span> */}
                </CardActions>
            </Card>

        )
    }
}


CardOverview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(CardOverview));