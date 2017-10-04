import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'; 
import { fetchComments, createComment } from '../actions/index';


class CommentsNew extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    onSubmit(props) {
        console.log('onSubmit props : ', props);
        this.props.createComment(this.props.id, props)
            .then(() => { this.props.fetchComments(this.props.id); this.props.fields['comment'].onChange('') });

    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form className="form-horizontal" onSubmit={ handleSubmit(this.onSubmit.bind(this)) } >
                <div className="form-group">
                    <label className="col-sm-2 control-label">
                        Comment
                    </label>
                    <div className="col-sm-10">
                        <textarea className="form-control" rows="5" {...this.props.fields['comment']} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">                    
                        <button className="btn btn-success btn-circle text-uppercase" type="submit" id="submitComment"><span className="glyphicon glyphicon-send"></span> Summit comment</button>
                    </div>
                </div>  
            </form>
        );
    }
}




function validate (values) {
    const errors = {};

    if (!values['comment']) {
        errors['comment'] = `Enter a comment`;
    }

    return errors;
}

export default reduxForm({
    form: 'CommentsNew',
    fields: ['comment'],
    validate
}, null, { fetchComments, createComment })(CommentsNew);
