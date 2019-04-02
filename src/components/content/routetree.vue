<template>
    <div class="left-tree" :style='{width:boxstyle.routetreestyle}'>

        <el-tree v-show="!boxstyle.show" :style='{overflow:defaultauto}' ref="tree" :data="data" :props="defaultProps" :default-expanded-keys="[current]" :highlight-current="true" accordion @node-click="handleNodeClick" node-key="id">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                    <i class="iconfont" :class="node.icon"></i>  {{ node.label }}
                </span>
            </span>
        </el-tree>
        <!-- <el-menu unique-opened  class="el-menu-vertical-demo" mode="vertical" :show-timeout="200" background-color="#00142a" text-color="hsla(0,0%,100%,.65)" active-text-color="#409eff" :collapse="isCollapse">
            <slidertree :menu="data" :isCollapse="isCollapse"></slidertree>
        </el-menu> -->

        <span @click="togglemenu()">
            <i class="el-icon-d-arrow-left" style="line-height: 50px;" title="收起" v-if="!boxstyle.show"></i>
            <i class="el-icon-d-arrow-right" style="line-height: 50px;" title="展开" v-if="boxstyle.show"></i>
        </span>
    </div>
</template>
<script>
import Bus from '@/eventBus.js';
export default {
    name: "trees",
    data() {
        return {
            isCollapse: true,
            data: [
				{
					label: "任务管理",
					icon: "icon-jiankongfuwu",
					children: [
						{
							id: 3,
                            url: "/task",
                            label: "任务列表",
                            icon: "icon-Management"
						}
					]
				},
				{
					label: "票务管理",
					icon: "icon-qunfengjichushuju",
					children: [
						{
							id: 3,
                            url: "/ticket",
                            label: "票务列表",
                            icon: "icon-Management"
						}
					]
				},
				{
					label: "咨询管理",
					icon: "icon-jiankongfuwu",
					children: [
						{
							id: 3,
                            url: "/consult",
                            label: "咨询列表",
                            icon: "icon-Management"
						}
					]
				},
				{
					label: "订单管理",
					icon: "icon-jiankongfuwu",
					children: [
						{
							id: 3,
                            url: "/order",
                            label: "订单列表",
                            icon: "icon-Management"
						}
					]
				},
				{
					label: "会员管理",
					icon: "icon-jiankongfuwu",
					children: [
						{
							id: 3,
                            url: "/member",
                            label: "会员列表",
                            icon: "icon-Management"
						}
					]
				},
                {
                    label: "系统管理",
                    icon: "icon-xitongguanli",
                    children: [
                        {
                            id: 3,
                            url: "/user",
                            label: "用户管理",
                            icon: "icon-Management"
                        },
                        {
                            id: 4,
                            url: "/role",
                            label: "权限管理",
                            icon: "icon-erji-caidanguanli"
                        },
                        {
                            id: 5,
                            url: "/resource",
                            label: "资源管理",
                            icon: "icon-jiaoseguanli"
                        },
                        {
                            id: 6,
                            url: "/dict",
                            label: "字典管理",
                            icon: "icon-zygl"
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            },
            defaultauto: "auto",
            show: false
        };
    },
    props: {
        boxstyle: {
            type: Object,
            requre: true
        }
    },
    computed: {
        current() {
            // 设置默认展开的状态
            var tree = sessionStorage.currentTree;
            var objtree = Number(tree);
            if (tree) {
                return objtree;
            }
            return Number(3);
        }
    },
    mounted() {
        this.setCurrentKey();
        Bus.$on("setroute",(currentroute)=>{
            this.$refs.tree.setCurrentKey(currentroute.id);
        })
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        togglemenu() {
            if (this.boxstyle.show) {
                this.$set(this.boxstyle, "show", false);
                this.$set(this.boxstyle, "routetreestyle", "15%");
                this.$set(this.boxstyle, "rightbox", "85%");
                this.defaultauto = "auto";
            } else {
                this.$set(this.boxstyle, "show", true);
                this.$set(this.boxstyle, "routetreestyle", "0%");
                this.$set(this.boxstyle, "rightbox", "100%");
                this.defaultauto = "hidden";
            }
        },
        setCurrentKey() {
            var tree = sessionStorage.currentTree;
            var objtree = Number(tree);
            var currentroute = this.$route.path;
            // 设置目录树的状态

            if (tree) {
                this.$refs.tree.setCurrentKey(objtree);
            } else {
                this.$refs.tree.setCurrentKey(3);
            }
        },
        handleNodeClick(data) {
			console.log(this.$route.path);
			console.log(data.url);
			if (data.url) {
				if(data.Relative==false){
					location.href=data.url
				}else{
					Bus.$emit("treeData",data);
					this.$router.push({
						path: data.url
					});
				}

				this.getCurrentKey();
				// this.$set(this.boxstyle,"fadeshow",true)

			}
        },
        getCurrentKey() {
            var tree = this.$refs.tree.getCurrentKey();
            if (tree) {
                sessionStorage.setItem("currentTree", JSON.stringify(tree));
            } else {
                sessionStorage.setItem("currentTree", 3);
            }
        }
    },
    components: {

    }
};
</script>
<style lang="less" scoped>
.left-tree {
    background-color: #002140;
    width: 15%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    transition: all 0.3s;
    & > span {
        width: 20px;
        height: 50px;
        position: absolute;
        right: -10px;
        top: 50%;
        transform: translate(50%, -50%);
        background: #ddd6d6;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        cursor: pointer;
        i {
            width: 100%;
            font-size: 20px;
            font-weight: 500;
        }
    }
}
</style>

