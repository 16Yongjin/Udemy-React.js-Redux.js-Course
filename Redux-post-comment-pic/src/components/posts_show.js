import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

import CommentsNew from './comments_new';
import CommentsShow from './comments_show';

class PostsShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.post)
            .then(() => { this.context.router.push('/') });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
                <button 
                    className="btn btn-danger pull-xs-right"
                    onClick={ this.onDeleteClick.bind(this) }>
                    Delete Post
                </button>
                <h3>{ post.title }</h3>
                <h6>Categories: { post.categories }</h6>
                <div className={ post.image ? '' : 'hide' } ><img src={ post.image } /> </div>
                <p>{ post.content }</p>

                <CommentsShow id={post.id} />
                <CommentsNew id={post.id} />
            </div>)
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);