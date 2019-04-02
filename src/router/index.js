import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/root'

//系统管理
import user from '@/components/content/struTable/admin/user'
import role from '@/components/content/struTable/admin/role'
import dict from '@/components/content/struTable/admin/dict'
import res from '@/components/content/struTable/admin/resource'

//会员管理
import members from '@/components/content/struTable/members'

//订单管理
import orders from '@/components/content/struTable/orders'

//咨询管理
import consults from '@/components/content/struTable/consults'

//票务管理
import tickets from '@/components/content/struTable/tickets'

//任务管理
import tasks from '@/components/content/struTable/tasks'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: Root,
			redirect: 'user',
			children: [

				{
					path: 'user',
					component: user
				},
				{
					path: 'role',
					component: role
				},
				{
					path: 'dict',
					component: dict
				},
				{
					path: 'resource',
					component: res
				},

				//会员管理
				{
					path: 'member',
					component: members
				},

				//订单管理
				{
					path: 'order',
					component: orders
				},

				//咨询管理
				{
					path: 'consult',
					component: consults
				},

				//票务管理
				{
					path: 'ticket',
					component: tickets
				},

				//任务管理
				{
					path: 'task',
					component: tasks
				},


			]
		}
	]
})
