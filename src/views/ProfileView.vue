<template>
    <Layout class="padding-10">
        <Breadcrumb class="margin-1">
            <BreadcrumbItem to="/"><Icon type="md-home" /></BreadcrumbItem>
            <BreadcrumbItem>{{$route.meta.title}}</BreadcrumbItem>
        </Breadcrumb>

        <Content>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <!-- iview這個menu有點爛，用click來硬抓值 -->
                    <Menu 
                        theme="light" 
                        width="auto" 
                    >
                        <MenuItem 
                            v-for="item in menu" 
                            :key="item.name"
                            @click="menuSelect(item.name)"
                        >
                            <Icon :type="item.icon" />
                            {{item.title}}
                        </MenuItem>
                    </Menu>
                </Sider>
                <Content :style="{padding: '24px', minHeight: '300px', background: '#fff'}">
                    <keep-alive>
                        <component :is="activeComponent"/>
                    </keep-alive>
                </Content>
            </Layout>
        </Content>
    </Layout>
</template>

<script>
    // component :is沒辦法用lazy load
    import UserInfo from "@/components/profile/UserInfo.vue"
    import History from "@/components/profile/History.vue"
    export default {
        components: {
            // UserInfo: () => import(/* webpackChunkName: "UserInfo" */'@/components/profile/UserInfo.vue'),
            // History: () => import(/* webpackChunkName: "History" */'@/components/profile/History.vue')
            UserInfo,
            History
        },
        data(){
            return {
                menu: [
                    {name: '1', icon: 'md-contact', title: '用戶資訊'},
                    {name: '2', icon: 'md-list-box', title: '購買記錄'}
                ],
                activeMenu : 1
            }
        },
        computed:{
            activeComponent(){
                if(this.activeMenu == 1) return 'UserInfo'
                if(this.activeMenu == 2) return 'History'
                return null
            }
        },
        methods:{
            menuSelect(name){
                this.activeMenu = name
            }
        }
    }
</script>