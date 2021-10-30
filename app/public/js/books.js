const bookApp = {
    data() {
        return {
            result: undefined,
            selectedBook: null,
            app:0,
            books : [],
            bookForm: {}
        }
    },
    methods: {
        fetchBookData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        postNewBook(evt) {       

            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
            
                // reset the form
                this.bookForm = {};
            });
        },
        postBook(evt) {
            if (this.selectedBook === null) {
                this.postNewBook(evt);
            } else {
                this.postEditBook(evt);
            }
          },
        postEditBook(evt) {
            fetch('api/books/update.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
    
                // reset the form
                this.resetBookForm();
              });
          },
        postDeleteBook(b) {
            if (!confirm("Are you sure you want to delete the book?")) {
              return;
            }
            console.log("Delete!", b);
    
            fetch('api/books/delete.php', {
                method:'POST',
                body: JSON.stringify(b),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
    
                // reset the form
                this.resetBookForm();
              });
          },
          selectBookToEdit(b) {
            this.selectedBook = b;
            this.bookForm = Object.assign({}, this.selectedBook);
          },
          resetBookForm() {
              this.selectedBook = null;
              this.bookForm = {};
          }
    },
    created() {
        this.fetchBookData();
    }
}
  
Vue.createApp(bookApp).mount('#bookApp');

