import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
	el: '#game',
	components: { App },
	template: '<app />',
	store,
})
