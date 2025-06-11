<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
			<el-form-item label="套餐名" prop="name">
				<el-input v-model="dataForm.name" placeholder="套餐名"></el-input>
			</el-form-item>
			<el-form-item label="设备类型" prop="deviceList">
				<el-select v-model="dataForm.deviceList" multiple placeholder="请选择设备类型" style="width: 100%">
					<el-option v-for="item in deviceTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { usePackageApi, usePackageSubmitApi } from '@/api/meal/package'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	name: '',
	deviceList: [],
	createTime: '',
	updateTime: '',
	deleted: ''
})

const deviceTypeOptions = [
	{ label: '灯', value: 1 },
	{ label: '风扇', value: 2 },
	{ label: '蜂鸣器', value: 3 },
	{ label: '温湿度传感器', value: 4 },
	{ label: '人体红外传感器', value: 5 },
	{ label: '光敏传感器', value: 6 }
]

const init = (id?: number) => {
	if (id) {
		getPackage(id)
	}
}

const getPackage = (id: number) => {
	usePackageApi(id).then(res => {
		Object.assign(dataForm, res.data)
		// 回显时把 deviceList 转成数字数组
		dataForm.deviceList = res.data.deviceList ? res.data.deviceList.map(d => Number(d.deviceType)) : []
	})
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	deviceList: [{ required: true, message: '请选择设备类型', trigger: 'change' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) return false

		console.log('提交前 deviceList:', dataForm.deviceList)
		const submitData = {
			...dataForm,
			deviceList: dataForm.deviceList.map(type => ({ deviceType: type }))
		}
		console.log('最终提交 submitData:', submitData)

		usePackageSubmitApi(submitData).then(() => {
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
