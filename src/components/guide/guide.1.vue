<template>
    <div>
        引导页1
    </div>
</template>
<script>
	export default{
		data(){
			return {
				//由于vueg的嵌套路由默认不启动转场动画，需要在其匹配组件中设置为启用
				vuegConfig:{
					disable:false
				}
			}
		}
	}
</script>
<style scoped>
div {
    background: linear-gradient(to bottom, #c9d6ff, #e2e2e2);
}
</style>