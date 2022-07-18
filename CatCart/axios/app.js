new Vue({
    el: "#app",
    data() {
        return {
            advice: "데이터 로딩중..."
        }
    },
    created() {
        // 서버에 데이터 요청하기
        axios.get("https://api.adviceslip.com/advice")
        // 성공시 then
             .then((response) => {
                 console.log(response);
             })
        // 실패시 catch
             .catch((error) => {
                 console.log(error);
             });
    }
});