export function selectBook(book) {
    // ActionCreator로서 객체와 타입을 가진 Action을 반환해야함
    return {
        type: 'BOOK_SELECTED',
        payload: book
    }
}