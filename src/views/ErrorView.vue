<template>
    <Exception 
        :type="errorCode" 
        :title="errorTitle"
        :desc="errorDesc"
        :back-text="'返回首頁'"
    />
</template>
<script>
    export default {
        data(){
            return {
                errorCode: 404,
            }
        },
        computed: {
            errorTitle(){
                if(this.errorCode == 404) {
                    return '抱歉，訪問的頁面不存在'
                }else if(this.errorCode == 403){
                    return '抱歉，無權限訪問該頁面'
                }else{
                    return '抱歉，伺服器出了一點錯誤'
                }
            },
            errorDesc(){
                if(this.errorCode == 404) {
                    return '抱歉，你訪問的頁面不存在'
                }else if(this.errorCode == 403){
                    return '抱歉，你無權限訪問該頁面'
                }else{
                    return '抱歉，伺服器出了一點錯誤'
                }
            }
        }
    }
</script>