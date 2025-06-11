<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
			<el-form-item label="套餐" prop="packageId">
				<el-select v-model="dataForm.packageId" placeholder="请选择套餐" style="width: 100%">
					<el-option v-for="(name, id) in packageNameList" :key="id" :label="name" :value="Number(id)"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="用户id" prop="userId">
				<el-input v-model="dataForm.userId" placeholder="用户id"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus/es'
import { usePackageUserApi, usePackageUserSubmitApi, usePackageNameListApi } from '@/api/meal/packageUser'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

// 套餐名列表
const packageNameList = ref<Record<number, string>>({})

const dataForm = reactive({
	id: '',
	packageId: '',
	userId: '',
	createTime: '',
	updateTime: '',
	deleted: ''
})

// 获取套餐名列表
const getPackageNameList = async () => {
	try {
		const res = await usePackageNameListApi()
		packageNameList.value = res.data
		return res.data
	} catch (error) {
		console.error('获取套餐列表失败:', error)
		packageNameList.value = {}
		return {}
	}
}

const init = async (id?: number) => {
	// 重置表单数据
	Object.assign(dataForm, {
		id: '',
		packageId: '',
		userId: '',
		createTime: '',
		updateTime: '',
		deleted: ''
	})

	// 先获取套餐列表
	await getPackageNameList()

	if (id) {
		// 修改模式：先设置id，再获取数据
		dataForm.id = id.toString()
		await getPackageUser(id)
	}
}

const getPackageUser = async (id: number) => {
	try {
		const res = await usePackageUserApi(id)
		Object.assign(dataForm, res.data)
		// 确保id存在
		if (!dataForm.id) {
			dataForm.id = id.toString()
		}
	} catch (error) {
		console.error('获取用户数据失败:', error)
	}
}

const dataRules = ref({
	packageId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	userId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}

		usePackageUserSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init
})
</script>
