import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'; 
import { createPost } from '../actions/index';
import { Link } from 'react-router';
import _ from 'lodash';

const FIELDS = {
    title: {
        type: 'input',
        label: 'Title for Post'
    },
    categories: {
        type: 'input',
        label: 'Enter some categories for this post'
    },
    content: {
        type: 'textarea',
        label: 'Post Contents'
    }
}

class PostsNew extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createPost(props)
            .then(() => { 
                // blog post ahs been created, navigate the user to the index
                this.context.router.push('/');
             })
    }


    renderField(filedConfig, field) {

        const fieldHelper = this.props.fields[field];

        return (
            <div className={`form-group ${ isInvalid(fieldHelper) }`} key={field}>
                    <label>{filedConfig.label}</label>
                    <filedConfig.type type="text" className="form-control" {...fieldHelper} />
                    <div className="text-help">
                        { fieldHelper.touched ? fieldHelper.error : '' }
                    </div>
            </div>
        )
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <h3>Create A New Post</h3>

                {_.map(FIELDS, this.renderField.bind(this))}

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function isInvalid(field) {
    if (field.touched && field.invalid) {
        return 'has-danger';
    } else {
        return '';
    }
}

function validate (values) {
    const errors = {};

    _.each(FIELDS, (type, field) => {
        if (!values[field]) {
            errors[field] = `Enter a ${field}`;
        }
    })

    return errors;
}

// connect: mapStateToProps, mapDispatchToProps
// reduxForm: config, mapStateToProps, mapDispatchToProps

export default reduxForm({
    form: 'PostNew',
    fields: _.keys(FIELDS),
    validate
}, null, { createPost })(PostsNew);