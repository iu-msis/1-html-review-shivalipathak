const bookApp = {
    data() {
        return {
            result:undefined,
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
        }
    },
    created() {
        this.fetchBookData();
    }
}
  
Vue.createApp(bookApp).mount('#bookApp');

