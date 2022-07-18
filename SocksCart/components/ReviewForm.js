// 전역 컴포넌트 생성
app.component("review-form", {
    template:
    /* html */
    `
        <form class="review-form" @submit.prevent="onSubmit">
            <h3>Leave a review</h3>
            <label for="name">Name:</label>
            <input id="name" v-model="name">

            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>

            <label for="rating">Rating:</label>
            <select id="rating" v-model="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
            <!-- 연습문제 -->
            <!-- 변수명: recommend -->
            <br>
            <label for="recommended">이 상품을 추천하시겠습니까?</label>
            <select id="recommended" v-model="recommend">
                <option>Yes</option>
                <option>No</option>
            </select>
            <input class="button" type="submit" value="Submit" />
    `,
    data() {
        return {
            name: "",
            review: "",
            rating: null,
            recommend: ""
        }
    },
    methods: {
        onSubmit() {
            if(this.name === "" || this.review === "" || this.rating === null || this.recommend === "") {
                alert("양식을 작성해 주세요.")
                return
            }

            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend
            }
            this.$emit("review-submitted", productReview)
            // 부모로 데이터 전송 후 아래 변수 초기화
            this.name = "",
            this.review = "",
            this.rating = null
            this.recommend = null
        },
        recommend() {
            return recommend
        }
    }
})