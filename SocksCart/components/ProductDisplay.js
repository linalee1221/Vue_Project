// Vue 2.x 문법 : Vue.component
// vue 3.x 문법 : app.component

// 전역 컴포넌트
app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
    },
    template:
    /* html */
    `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <!-- 이미지가 들어갈 공간 -->
                <img :src="image" />
            </div>
            
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="InStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <!-- premium이 true이면 free, false면 2.99 -->
                <!-- 변수명(함수명): shipping -->
                <!-- Shipping Free(or 2.99) 아래 위치에 출력해 주세요 -->
                <p>Shipping {{shipping}}</p>

                <!-- details를 이용하여 자식 컴포넌트 생성(반복문) -->
                <!-- 아래 ul 태그 부분을 자식 컴포넌트(이름은 product-details)로 생성 -->
                <!-- props : details -->
                <!-- details : details -->
                <!-- 아래 위치에 보여주세요 -->
                <product-details :details="details"></product-details>

                <!-- 마우스가 글자에 위치하면 그 색상의 -->
                <!-- 양말 이미지가 보이게 하는 로직 -->
                <!-- 펑션명 : updateImage(variant.image) -->
                <div v-for="(variant,index) in variants"
                    :key="variant.id" @mouseover="updateImage(index)"
                    class="color-circle"
                    :style="{'background-color': variant.color}">
                </div>
                <!-- 장바구니 버튼을 클릭하면 어딘가에 출력을 해서 카운트가 올라가게 하기 -->
                <button class="button" 
                        :class="{ disabledButton: !InStock }"
                        :disabled="!InStock"
                        v-on:click="addToCart">
                    Add To Cart
                </button>
                <button class="button"
                        :class="{disabledButton: !InStock}"
                        :disabled="!InStock"
                        v-on:click="removeFromCart">
                    Remove Item
                </button>
            </div>
        </div>
        <!-- 양식 내용 보여주기 -->
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <!-- 양식 작성 입력란 -->
        <review-form @review-submitted="addReview"></review-form>
    </div>
    `,
    data() {
        return {
            product: "Socks",
            brand: "Vue Mastery",
            selectedVariant: 0,
            reviews: [],
            // cart: 0,
            // InStock: true,
            details: ["50% cotton", "30% wool", "20% polyester"],
            variants: [
                {
                    id:2234, 
                    color:"green",
                    image: "./assets/images/greensocks.jpg",
                    quantity: 50
                },
                {
                    id:2235, 
                    color:"blue",
                    image: "./assets/images/bluesocks.jpg",
                    quantity: 0
                }
            ]
        }
    },
    methods: {
        addToCart() {
            // 컴포넌트화 되어서 부모 쪽으로 클릭 이벤트 신호를 보냄
            // this.cart += 1
            this.$emit("add-to-cart", this.variants[this.selectedVariant].id)
        },
        removeFromCart() {
            this.$emit("remove-from-cart", this.variants[this.selectedVariant].id)
        },
        updateImage(index) {
            this.selectedVariant = index;
        },
        addReview(review) {
            this.reviews.push(review);
        }
    },

    // 양방향 바인딩 기술 : computed
    // 데이터를 감시하다가 변경되면 자동 화면 갱신
    // 변경이 안되어도 화면에 보여주고 성능 개선의 효과를 냄
    // 미리 결과 데이터를 임시 저장공간에 저장함
    // methods/computed 차이
    // methods : 주로 이벤트(click, mouseover, mouseleave 등등...)에 쓴다
    // computed : 1) 데이터 감시 목적, 성능 개선 효과, 2) 매개변수 없는 펑션, 
    //            3) 항상 return으로 값을 넘김, 4) 출력은 {{ computed펑션 }}으로 간단하게 씀
    computed: {
        title() {
            // 데이터가 변경이 되면 화면에 자동으로 변경된 데이터를 보여줌
            return this.brand + " " + this.product;
        },
        image() {
            // 기본이미지(녹색양말 이미지)
            // this.variants[0].image인데
            // this.selectedVariant=0이라서 아래처럼 코딩 가능
            return this.variants[this.selectedVariant].image
            // 데이터가 변경이 되면 화면에 자동으로 갱신
        },
        InStock() {
            return this.variants[this.selectedVariant].quantity
            // 데이터가 변경이 되면 화면에 자동으로 갱신
        },
        shipping() {
            if(this.premium) {
                return "Free"
            } 
            return 2.99
        }
    }
});