// const product = "Socks"
// 2.x : new Vue
// 2.x : Vue.createApp
const app = Vue.createApp({
    data() {
        return {
            cart: [],
            prem: false
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeById(id) {
        // id에 해당하는 값을 찾아 배열에서 삭제
        // 1. id에 해당하는 배열의 인덱스번호 찾기
        // indexOf
        // 1st 매개변수 : 배열의값
        // return 값 : 배열의 index번호
        const index = this.cart.indexOf(id);
        // 2. splice  
        // 1st 매개변수 : 배열의 index번호
        // 2st 매개변수 : 삭제될 갯수
            this.cart.splice(index,1)
        }
    },
})