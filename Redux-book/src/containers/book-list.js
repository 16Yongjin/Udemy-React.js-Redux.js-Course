import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index'
import { bindActionCreators } from 'redux'

class BookList extends Component {
    renderList() {
        return this.props.books.map(book => {
            return (
                <li 
                    key={book.title} 
                    onClick={() => this.props.selectBook(book)}
                    className="list-group-item">
                    {book.title}
                </li>
            );
        });
    }

    render() {
        return <ul className="list-grouop col-sm-4">{this.renderList()}</ul>;
    }
}

const mapStateToProps = (state) => {
    // 여기로 들어오는 모든 입력이 BookList 컨테이너의 props가 됨
    return {
        books: state.books
    };
};

// 반환값이 BookList 컨테이너의 props가 됨
const mapDispatchToProps = (dispatch) => {
    // selectBook이 불러질 때마다 결과값이 리듀서에 감
    return bindActionCreators({ selectBook }, dispatch);
}

//  컴포넌트를 컨테이너로 만들고 메서드의 반환값을 컨테이너의 prop으로 만들어줌
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
 