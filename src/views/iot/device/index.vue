<template>
	<el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item prop="deviceId">
				<el-input v-model="state.queryForm.deviceId" placeholder="设备id"></el-input>
			</el-form-item>
			<el-form-item prop="name">
				<el-input v-model="state.queryForm.name" placeholder="设备名称"></el-input>
			</el-form-item>
			<el-form-item prop="type">
				<el-input v-model="state.queryForm.type" placeholder="类型 1 灯 2 温湿度传感器 3 蜂鸣器  4 红外传感器"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="Search" type="primary" @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button icon="RefreshRight" @click="resetWithAdmin(queryRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>

	<el-card>
		<el-space>
			<el-space>
				<el-button v-auth="'iot:device:save'" icon="Plus" type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-space>
			<el-space>
				<el-button v-auth="'iot:device:export'" plain icon="Download" @click="downloadHandle('/new/iot/device/export')">导出</el-button>
			</el-space>
			<el-space>
				<el-button v-auth="'iot:device:delete'" icon="Delete" plain type="danger" @click="deleteBatchHandle()">批量删除</el-button>
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
			<el-table-column prop="id" label="主键" header-align="center" align="center"></el-table-column>
			<el-table-column prop="deviceId" label="设备id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="name" label="设备名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="type" label="类型" header-align="center" align="center"></el-table-column>
			<el-table-column prop="isSwitched" label="开关" header-align="center" align="center"></el-table-column>
			<el-table-column prop="status" label="状态" header-align="center" align="center"></el-table-column>
			<el-table-column prop="temperature" label="温度" header-align="center" align="center"></el-table-column>
			<el-table-column prop="humidity" label="湿度" header-align="center" align="center"></el-table-column>
			<el-table-column prop="tenantId" label="租户id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="adminId" label="管理员id" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button v-auth="'iot:device:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button v-auth="'iot:device:delete'" type="primary" link @click="deleteBatchHandle(scope.row.id)">删除</el-button>
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

<script setup lang="ts" name="IotDeviceIndex">
import { useCrud } from '@/hooks'
import { reactive, nextTick, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import AddOrUpdate from './add-or-update.vue'
import { useUserStore } from '@/store/modules/user'
import { onMounted } from 'vue'

const userStore = useUserStore()
const state: IHooksOptions = reactive({
	dataListUrl: '/new/iot/device/page',
	deleteUrl: '/new/iot/device',
	queryForm: {
		deviceId: '',
		name: '',
		type: '',
		tenantId: '',
		adminId: userStore.user.id
	}
})
console.log('123', userStore.user.id)
const queryRef = ref()
const addOrUpdateVisible = ref(false)
const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateVisible.value = true
	nextTick(() => addOrUpdateRef.value.init(id))
}
// 重置后还原 adminId
const resetWithAdmin = async (formRef: any) => {
	await reset(formRef)
	state.queryForm.adminId = userStore.user.id
	getDataList()
}
const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle, downloadHandle, reset } = useCrud(state)

onMounted(() => {
	getDataList()
})
</script>
