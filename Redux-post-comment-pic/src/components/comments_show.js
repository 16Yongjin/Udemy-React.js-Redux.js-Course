import React, { Component } from 'react';
import { fetchComments } from '../actions/index';
import { connect } from 'react-redux';

import moment from 'moment';
import _ from 'lodash';

class CommentsShow extends Component {
    componentWillMount() {
        this.props.fetchComments(this.props.id);
        console.log('comment show id :', this.props.id)
    }

    render() {
        return (
            <div>
                <ul className="media-list">
                    {this.props.comments.map(comment => {
                        return (
                            <li className="media" key={comment.comment_id}>
                                <div className="media-body">
                                    <div className="well well-lg">
                                        <h4 className="media-heading text-uppercase reviews">
                                            UserNameHere
                                        </h4>
                                        <ul className="media-date text-uppercase reviews list-inline">
                                            {moment(comment.time).format(
                                                'h:mm:ss'
                                            )}
                                        </ul>
                                        <p className="media-comment">
                                            {comment.comment}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { comments: state.comments.all };
}


export default connect(mapStateToProps, { fetchComments })(CommentsShow);