Vue.component('file', {
    template: '<li @click="redirect" @mouseover="over" @mouseleave="leave" v-bind:class="{ rainbow : up }">{{ fname }}</li>',
    data: function () {
        return {
            fname: "",
            up: false
        }
    },
    props: ['fname'],
    methods: {
        redirect: function () {
            let url = document.URL

            if(url[url.length - 1] == '/'){
                url += this.fname
            }else{
                url += '/' + this.fname
            }

            location.href =  url
        },
        over: function () {
            this.up = true
        },
        leave: function () {
            this.up = false
        }
    }
})

var vm = new Vue({
    el: "#app",
    data: {
        up: false
    }
})
