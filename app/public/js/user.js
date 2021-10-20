const UserInfo = {
    data() {
      return {
        "students": [],
        "selectedStudent": null,
        "offers": []
        }
    },
    computed: {},
    methods: {
        selectedStudent(s) {
            if(this.selectedStudent==s){
                return;
            }
            this.selectedStudent = s;
            this.offers = [];
            this.fetchOfferData(s);
        },
        fetchStudentData() {
            fetch('/api/student/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.students = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchOfferData(s) {
            fetch('/api/offers/?student=' +s.id)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.offer = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            })
        }
    },
    created() {
        this.fetchStudentData();
    }
}
  
Vue.createApp(UserInfo).mount('#offerApp');