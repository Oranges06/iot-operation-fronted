<template>
	<el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item prop="username">
				<el-input v-model="state.queryForm.username" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item prop="realName">
				<el-input v-model="state.queryForm.realName" placeholder="姓名"></el-input>
			</el-form-item>
			<el-form-item prop="mobile">
				<el-input v-model="state.queryForm.mobile" placeholder="手机号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="Search" type="primary" @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button icon="RefreshRight" @click="reset(queryRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>

	<el-card>
		<el-space>
			<el-space>
				<el-button v-auth="'tenant:tenant:save'" icon="Plus" type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-space>
			<el-space>
				<el-button v-auth="'tenant:tenant:export'" plain icon="Download" @click="downloadHandle('/new/tenant/export')">导出</el-button>
			</el-space>
			<el-space>
				<el-button v-auth="'tenant:tenant:delete'" icon="Delete" plain type="danger" @click="deleteBatchHandle()">批量删除</el-button>
			</el-space>
		</el-space>
		<el-table
			v-loading="state.dataListLoading"
			:data="state.dataList"
			border
			class="layout-table"
			show-overflow-tooltip
			@selection-change="selectionChangeHandle"
		>
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="username" label="用户名" header-align="center" align="center"></el-table-column>
			<el-table-column prop="realName" label="姓名" header-align="center" align="center"></el-table-column>
			<el-table-column prop="avatar" label="头像" header-align="center" align="center"></el-table-column>
			<ma-dict-table prop="gender" label="性别   0：男   1：女   2：未知" dict-type="user_gender"></ma-dict-table>
			<el-table-column prop="email" label="邮箱" header-align="center" align="center"></el-table-column>
			<el-table-column prop="mobile" label="手机号" header-align="center" align="center"></el-table-column>
			<ma-dict-table prop="superAdmin" label="超级管理员   0：否   1：是" dict-type="user_super_admin"></ma-dict-table>
			<ma-dict-table prop="status" label="状态  0：停用   1：正常" dict-type="user_status"></ma-dict-table>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button v-auth="'tenant:tenant:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button v-auth="'tenant:tenant:delete'" type="primary" link @click="deleteBatchHandle(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			:current-page="state.page"
			:page-sizes="state.pageSizes"
			:page-size="state.limit"
			:total="state.total"
			layout="total, sizes, prev, pager, next, jumper"
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
		>
		</el-pagination>

		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update
			v-if="addOrUpdateVisible"
			ref="addOrUpdateRef"
			v-model:visible="addOrUpdateVisible"
			@refresh-data-list="getDataList"
		></add-or-update>
	</el-card>
</template>

<script setup lang="ts" name="TenantTenantIndex">
import { useCrud } from '@/hooks'
import { reactive, nextTick, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import AddOrUpdate from './add-or-update.vue'

const state: IHooksOptions = reactive({
	dataListUrl: '/new/new/tenant/page',
	deleteUrl: '/new/new/tenant',
	queryForm: {
		username: '',
		realName: '',
		mobile: ''
	}
})

const queryRef = ref()
const addOrUpdateVisible = ref(false)
const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateVisible.value = true
	nextTick(() => addOrUpdateRef.value.init(id))
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle, downloadHandle, reset } = useCrud(state)
</script>
